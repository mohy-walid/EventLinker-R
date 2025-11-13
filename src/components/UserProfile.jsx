import { useState, useEffect } from "react";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("myEvents");
  const [savedEvents, setSavedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [volunteerPrograms, setVolunteerPrograms] = useState([]);

  useEffect(() => {
    // دي أمثلة — بعدين هتقرأيهم من localStorage
    const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
    const registered =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const volunteer =
      JSON.parse(localStorage.getItem("volunteerPrograms")) || [];

    setSavedEvents(saved);
    setRegisteredEvents(registered);
    setVolunteerPrograms(volunteer);
  }, []);

  const handleRemove = (id) => {
    const updated = savedEvents.filter((e) => e.id !== id);
    localStorage.setItem("savedEvents", JSON.stringify(updated));
    setSavedEvents(updated);
  };

  const handleCancel = (title) => {
  const updated = registeredEvents.filter((e) => e.title !== title);
  localStorage.setItem("registeredEvents", JSON.stringify(updated));
  setRegisteredEvents(updated);
  alert("Registration cancelled ❌");
};


  const renderContent = () => {
    if (activeTab === "myEvents") {
      return savedEvents.length > 0 ? (
        <div className="row g-3 mt-3">
          {savedEvents.length > 0 ? (
            savedEvents.map((event) => (
              <div key={event.id} className="col-12 col-sm-6 col-lg-4">
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
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge rounded-pill text-bg-secondary me-1"
                      >
                        {tag}
                      </span>
                    ))}
                    <p className="m-2">{event.description}</p>
                    <div className="d-flex justify-content-end mt-2">
                      <a href={event.detailsLink} className="btn btn-primary">
                        Visit Now
                      </a>
                    </div>
                  </div>

                  {/* زر X للحذف */}
                  <span
                    className="position-absolute top-0 end-0 p-2"
                    style={{
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      color: "red",
                    }}
                    onClick={() => handleRemove(event.id)}
                  >
                    &times;
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center mt-4">No saved events yet.</p>
          )}
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

            {/* زر الإلغاء */}
            <button
              className="btn btn-outline-danger mt-auto w-100 fw-semibold"
              onClick={() => handleCancel(event.title)}
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
      return volunteerPrograms.length > 0 ? (
        <div className="row g-3 mt-3">
          {volunteerPrograms.map((prog, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="card-custom border rounded p-3">
                <h6>{prog.title}</h6>
                <span className="badge bg-success">{prog.status}</span>
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
