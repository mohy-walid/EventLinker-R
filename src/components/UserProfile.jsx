import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myEvents");
  const [savedEvents, setSavedEvents] = useState([]);
  const [savedVolunteers, setSavedVolunteers] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [appliedVolunteers, setAppliedVolunteers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // دالة للحصول على مفتاح خاص بالمستخدم
  const getUserKey = (baseKey) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return null;
    return `${baseKey}_${user.id}`;
  };

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }
    setCurrentUser(user);

    // جلب البيانات الخاصة بالمستخدم الحالي فقط
    const savedEventsKey = getUserKey("savedEvents");
    const savedVolunteersKey = getUserKey("savedVolunteers");
    const registeredEventsKey = getUserKey("registeredEvents");
    const appliedVolunteersKey = getUserKey("appliedVolunteers");

    setSavedEvents(JSON.parse(localStorage.getItem(savedEventsKey)) || []);
    setSavedVolunteers(JSON.parse(localStorage.getItem(savedVolunteersKey)) || []);
    setRegisteredEvents(JSON.parse(localStorage.getItem(registeredEventsKey)) || []);
    setAppliedVolunteers(JSON.parse(localStorage.getItem(appliedVolunteersKey)) || []);
  }, [navigate]);

  const handleRemoveEvent = (id) => {
    const key = getUserKey("savedEvents");
    if (!key) return;

    const updated = savedEvents.filter((e) => e.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    
    const idsKey = getUserKey("savedEventIds");
    const ids = JSON.parse(localStorage.getItem(idsKey)) || [];
    const updatedIds = ids.filter((eventId) => eventId !== id);
    localStorage.setItem(idsKey, JSON.stringify(updatedIds));
    
    setSavedEvents(updated);
    alert("Event removed from saved ❌");
  };

  const handleRemoveVolunteer = (id) => {
    const key = getUserKey("savedVolunteers");
    if (!key) return;

    const updated = savedVolunteers.filter((v) => v.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    
    const idsKey = getUserKey("savedVolunteerIds");
    const ids = JSON.parse(localStorage.getItem(idsKey)) || [];
    const updatedIds = ids.filter((volId) => volId !== id);
    localStorage.setItem(idsKey, JSON.stringify(updatedIds));
    
    setSavedVolunteers(updated);
    alert("Volunteer opportunity removed from saved ❌");
  };

  const handleCancelEvent = (title) => {
    const key = getUserKey("registeredEvents");
    if (!key) return;

    const updated = registeredEvents.filter((e) => e.title !== title);
    localStorage.setItem(key, JSON.stringify(updated));
    setRegisteredEvents(updated);
    alert("Event registration cancelled ❌");
  };

  const handleCancelVolunteer = (title) => {
    const key = getUserKey("appliedVolunteers");
    if (!key) return;

    const updated = appliedVolunteers.filter((v) => v.title !== title);
    localStorage.setItem(key, JSON.stringify(updated));
    setAppliedVolunteers(updated);
    alert("Volunteer application cancelled ❌");
  };

  const visitDetails = (item) => {
    navigate("/details", { state: item });
  };

  const renderContent = () => {
    if (activeTab === "myEvents") {
      const hasItems = savedEvents.length > 0 || savedVolunteers.length > 0;
      
      return hasItems ? (
        <div className="row g-3 mt-3">
          {/* عرض الأحداث المحفوظة */}
          {savedEvents.map((event) => (
            <div key={`event-${event.id}`} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card event-card h-100 position-relative"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={event.img}
                  className="card-img-top img-fluid"
                  alt={event.title}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{event.title}</h5>
                  <p className="card-text">{event.text}</p>
                  <div className="d-flex flex-wrap mb-2">
                    {event.tags && event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge rounded-pill text-bg-secondary me-1 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="m-2">{event.description}</p>
                  <div className="d-flex justify-content-end mt-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => visitDetails(event)}
                    >
                      Visit Now
                    </button>
                  </div>
                </div>

                {/* زر X للحذف */}
                <span
                  className="position-absolute top-0 end-0 p-2"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "red",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleRemoveEvent(event.id)}
                  title="Remove from saved"
                >
                  &times;
                </span>
              </div>
            </div>
          ))}

          {/* عرض فرص التطوع المحفوظة */}
          {savedVolunteers.map((volunteer) => (
            <div key={`volunteer-${volunteer.id}`} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card volunteer-card h-100 position-relative"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={volunteer.img}
                  className="card-img-top img-fluid"
                  alt={volunteer.title}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{volunteer.title}</h5>
                  <p className="card-text text-muted">{volunteer.org}</p>
                  <div className="d-flex flex-wrap mb-2">
                    {volunteer.tags && volunteer.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge rounded-pill text-bg-secondary me-1 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="m-2">{volunteer.description}</p>
                  <div className="d-flex justify-content-end mt-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => visitDetails(volunteer)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* زر X للحذف */}
                <span
                  className="position-absolute top-0 end-0 p-2"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "red",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleRemoveVolunteer(volunteer.id)}
                  title="Remove from saved"
                >
                  &times;
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center mt-4">No saved events yet.</p>
      );
    }

    if (activeTab === "registered") {
      return registeredEvents.length > 0 ? (
        <div className="row g-4 mt-3">
          {registeredEvents.map((event, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100 p-3 d-flex flex-column justify-content-between"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
              >
                <div>
                  <img
                    src={event.img || "../../public/img/default.jpg"}
                    className="card-img-top rounded-4 mb-3"
                    alt={event.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <h5 className="fw-bold">{event.title}</h5>
                  <p className="text-muted small mb-2">
                    <i className="fa-regular fa-calendar-days me-2"></i>
                    {event.date}
                  </p>
                  <p className="text-muted small mb-3">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {event.location}
                  </p>
                </div>

                <button
                  className="btn btn-outline-danger mt-auto w-100 fw-semibold"
                  onClick={() => handleCancelEvent(event.title)}
                >
                  <i className="fa-solid fa-xmark me-1"></i> Cancel Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center mt-4">No registered events.</p>
      );
    }

    if (activeTab === "volunteering") {
      return appliedVolunteers.length > 0 ? (
        <div className="row g-4 mt-3">
          {appliedVolunteers.map((volunteer, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100 p-3 d-flex flex-column justify-content-between"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
              >
                <div>
                  <img
                    src={volunteer.img || "../../public/img/default.jpg"}
                    className="card-img-top rounded-4 mb-3"
                    alt={volunteer.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <h5 className="fw-bold">{volunteer.title}</h5>
                  <p className="text-muted small mb-2">
                    <i className="fa-solid fa-building me-2"></i>
                    {volunteer.org}
                  </p>
                  <div className="d-flex flex-wrap mb-2">
                    {volunteer.tags && volunteer.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="badge rounded-pill text-bg-secondary me-1 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-outline-danger mt-auto w-100 fw-semibold"
                  onClick={() => handleCancelVolunteer(volunteer.title)}
                >
                  <i className="fa-solid fa-xmark me-1"></i> Cancel Application
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center mt-4">No volunteering programs.</p>
      );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="choose d-flex justify-content-center align-items-center profile-t bg-white p-2 rounded-5">
          <h5
            className={`me-2 ${activeTab === "myEvents" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("myEvents")}
            style={{ cursor: "pointer" }}
          >
            My Events
          </h5>
          <h5
            className={`me-2 ${
              activeTab === "registered" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("registered")}
            style={{ cursor: "pointer" }}
          >
            Registered Events
          </h5>
          <h5
            className={`${activeTab === "volunteering" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("volunteering")}
            style={{ cursor: "pointer" }}
          >
            Volunteering Programs
          </h5>
        </div>
      </div>

      {/* المحتوى اللي بيتغير حسب الاختيار */}
      <div className="container">{renderContent()}</div>
    </>
  );
}

export default UserProfile;