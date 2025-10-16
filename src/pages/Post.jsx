const PostEventPage = () => {
  return (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
      <div
        className="container bg-white shadow-lg rounded fade-in-up p-0"
        style={{ maxWidth: "900px" }}
      >
        {/* Header */}
        <div className="p-4 border-bottom fade-in">
          <h1 className="h4 fw-bold text-dark">Post a New Event</h1>
          <p className="text-muted small">
            Fill in the details below to create your event listing.
          </p>
        </div>

        <form className="p-4">
          {/* Event Title + Category */}
          <div className="row g-4">
            <div className="col-md-6 fade-in-up">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                placeholder="Enter event title"
                className="form-control"
              />
            </div>
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>Select a category</option>
                <option>Conference</option>
                <option>Workshop</option>
                <option>Webinar</option>
              </select>
            </div>
          </div>

          {/* Date + Time */}
          <div className="row g-4 mt-3">
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <label className="form-label">Date</label>
              <input type="date" className="form-control" />
            </div>
            <div
              className="col-md-6 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <label className="form-label">Time</label>
              <input type="time" className="form-control" />
            </div>
          </div>

          {/* Location Details */}
          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "0.8s" }}
          >
            <h2 className="h6 fw-semibold text-dark mb-3">Location Details</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19680.29967123197!2d30.842387056901913!3d29.311137728586633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1756154006336!5m2!1sar!2seg"
              width="100%"
              height="400"
              className="rounded w-100"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Event Location"
            ></iframe>
            <input
              type="text"
              placeholder="Enter venue name or 'Virtual'"
              className="form-control mt-3"
            />
          </div>

          {/* Event Information */}
          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "1s" }}
          >
            <h2 className="h6 fw-semibold text-dark mb-3">Event Information</h2>
            <label className="form-label">Event Description</label>
            <textarea
              rows="4"
              placeholder="Provide a detailed description of your event..."
              className="form-control"
            ></textarea>
          </div>

          {/* Event Banner Image */}
          <div
            className="fade-in-up mt-4"
            style={{ animationDelay: "1.2s" }}
          >
            <label className="form-label mb-2">Event Banner Image</label>
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
                Drag & drop your banner here, or click to upload
              </p>
              <p className="text-secondary small mt-1">
                Recommended size: 1200x400 pixels
              </p>
            </label>
            <input
              id="banner-upload"
              type="file"
              className="d-none"
            />
          </div>

          {/* Submit Button */}
          <div
            className="d-flex justify-content-end mt-4 fade-in-up"
            style={{ animationDelay: "1.4s" }}
          >
            <button type="submit" className="btn btn-success px-4">
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEventPage;
