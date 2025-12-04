import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PostEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const mode = location.state?.mode || "create";
  const editData = location.state?.data || null; 
  const initialType = location.state?.type || "event";

  const [postType, setPostType] = useState(initialType);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    img: "",
    tags: [],
    org: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && editData) {
      setFormData({
        title: editData.title || "",
        category: editData.category || "",
        date: editData.date || "",
        time: editData.time || "",
        location: editData.location || "",
        description: editData.text || editData.description || "",
        img: editData.img || "",
        tags: editData.tags || [],
        org: editData.org || ""
      });
      if (editData.img) {
        setImagePreview(editData.img);
      }
    }
  }, [mode, editData]);

  const handleTypeChange = (type) => {
    if (mode === "create") {
      setPostType(type);
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
        img: "",
        tags: [],
        org: ""
      });
      setImagePreview(null);
    }
  };

  const getUserKey = (baseKey, userId) => {
    return `${baseKey}_${userId}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with type:", postType);
    console.log("Form data:", formData);

    if (!formData.title || !formData.category || !formData.date) {
      alert("Please fill in all required fields!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login first!");
      return;
    }

    console.log("Current user:", currentUser);

    const itemData = {
      id: mode === "edit" ? editData.id : Date.now(),
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      text: formData.description,
      img: formData.img || "../../public/img/default.jpg",
      tags: formData.tags.length > 0 ? formData.tags : [formData.category],
      org: postType === "volunteer" ? formData.org : undefined,
      organizerId: currentUser.id,
      organizerName: currentUser.name
    };

    const storageKey = postType === "event" 
      ? getUserKey("postedEvents", currentUser.id)
      : getUserKey("postedVolunteers", currentUser.id);

    const existingItems = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (mode === "edit") {
      const updatedItems = existingItems.map(item => 
        item.id === editData.id ? itemData : item
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
      
      window.dispatchEvent(new Event('dataUpdated'));
      
      alert(`${postType === "event" ? "Event" : "Volunteer opportunity"} updated successfully! ✅`);
    } else {
      existingItems.push(itemData);
      localStorage.setItem(storageKey, JSON.stringify(existingItems));
      
      window.dispatchEvent(new Event('dataUpdated'));
      
      alert(`${postType === "event" ? "Event" : "Volunteer opportunity"} posted successfully! ✅`);
      
      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
        img: "",
        tags: [],
        org: ""
      });
      setImagePreview(null);
    }

    navigate("/profile");
  };

  return (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center pt-5 pb-5">
      <div
        className="container bg-white shadow-lg rounded fade-in-up p-0"
        style={{ maxWidth: "900px" }}
      >
        <div className="p-4 border-bottom fade-in">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1 className="h4 fw-bold text-dark mb-1">
                {mode === "edit" ? "Edit" : "Post a New"} {postType === "event" ? "Event" : "Volunteer Opportunity"}
              </h1>
              <p className="text-muted small mb-0">
                {mode === "edit" 
                  ? "Update the details below to modify your listing." 
                  : "Fill in the details below to create your listing."}
              </p>
            </div>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate("/profile")}
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Back
            </button>
          </div>

          {mode === "create" && (
            <div className="d-flex justify-content-center">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${postType === "event" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => handleTypeChange("event")}
                >
                  <i className="fa-solid fa-calendar-days me-2"></i>
                  Event
                </button>
                <button
                  type="button"
                  className={`btn ${postType === "volunteer" ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => handleTypeChange("volunteer")}
                >
                  <i className="fa-solid fa-hand-holding-heart me-2"></i>
                  Volunteer Opportunity
                </button>
              </div>
            </div>
          )}
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6 fade-in-up">
              <label className="form-label">
                {postType === "event" ? "Event" : "Opportunity"} Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="form-control"
                required
              />
            </div>
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <label className="form-label">Category *</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                {postType === "event" ? (
                  <>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Networking">Networking</option>
                  </>
                ) : (
                  <>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                    <option value="Technology">Technology</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {postType === "volunteer" && (
            <div className="fade-in-up mt-4" style={{ animationDelay: "0.3s" }}>
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                name="org"
                value={formData.org}
                onChange={handleChange}
                placeholder="Enter organization name"
                className="form-control"
              />
            </div>
          )}

          <div className="row g-4 mt-3">
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <label className="form-label">Date *</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <label className="form-label">Time</label>
              <input 
                type="time" 
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "0.8s" }}
          >
            <h2 className="h6 fw-semibold text-dark mb-3">Location Details</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19680.29967123197!2d30.842387056901913!3d29.311137728586633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1756154006336!5m2!1sar!2seg"
              width="100%"
              height="300"
              className="rounded w-100"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location"
            ></iframe>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter venue name or 'Virtual'"
              className="form-control mt-3"
            />
          </div>

          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "1s" }}
          >
            <h2 className="h6 fw-semibold text-dark mb-3">
              {postType === "event" ? "Event" : "Opportunity"} Information
            </h2>
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Provide a detailed description..."
              className="form-control"
              required
            ></textarea>
          </div>

          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "1.2s" }}
          >
            <label className="form-label mb-2">Banner Image</label>
            
            {imagePreview && (
              <div className="mb-3 position-relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="img-fluid rounded w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, img: "" }));
                  }}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            )}

            <label
              htmlFor="banner-upload"
              className="d-flex flex-column align-items-center justify-content-center w-100 border border-2 border-dashed rounded p-4 bg-light text-center"
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-upload mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="50"
                height="50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 010 10h-1"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="text-muted small mb-0">
                {imagePreview ? "Click to change image" : "Drag & drop your banner here, or click to upload"}
              </p>
              <p className="text-secondary small mt-1">
                Recommended size: 1200x400 pixels
              </p>
            </label>
            <input
              id="banner-upload"
              type="file"
              className="d-none"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div
            className="d-flex justify-content-end gap-2 mt-4 fade-in-up"
            style={{ animationDelay: "1.4s" }}
          >
            <button 
              type="button" 
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
            <button type="submit" className={`btn ${postType === "event" ? "btn-primary" : "btn-success"} px-4`}>
              <i className={`fa-solid ${mode === "edit" ? "fa-save" : "fa-paper-plane"} me-2`}></i>
              {mode === "edit" ? "Update" : "Submit"} {postType === "event" ? "Event" : "Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEventPage;
