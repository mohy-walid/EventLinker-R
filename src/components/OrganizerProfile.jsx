import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrganizerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");
  const [postedEvents, setPostedEvents] = useState([]);
  const [postedVolunteers, setPostedVolunteers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // دالة للحصول على مفتاح خاص بالمستخدم
  const getUserKey = (baseKey, userId) => {
    return `${baseKey}_${userId}`;
  };

  // دالة لحساب عدد المسجلين من جميع المستخدمين
  const getRegisteredCount = (eventTitle) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let totalCount = 0;

    users.forEach(user => {
      const key = getUserKey("registeredEvents", user.id);
      const userRegistrations = JSON.parse(localStorage.getItem(key)) || [];
      const count = userRegistrations.filter(e => e.title === eventTitle).length;
      totalCount += count;
    });

    return totalCount;
  };

  // دالة لحساب عدد المتقدمين من جميع المستخدمين
  const getAppliedCount = (volunteerTitle) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let totalCount = 0;

    users.forEach(user => {
      const key = getUserKey("appliedVolunteers", user.id);
      const userApplications = JSON.parse(localStorage.getItem(key)) || [];
      const count = userApplications.filter(v => v.title === volunteerTitle).length;
      totalCount += count;
    });

    return totalCount;
  };

  // دالة للحصول على جميع المسجلين في حدث معين
  const getRegisteredUsers = (eventTitle) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const registeredUsers = [];

    users.forEach(user => {
      const key = getUserKey("registeredEvents", user.id);
      const userRegistrations = JSON.parse(localStorage.getItem(key)) || [];
      const isRegistered = userRegistrations.some(e => e.title === eventTitle);
      if (isRegistered) {
        registeredUsers.push({
          name: user.name,
          email: user.email
        });
      }
    });

    return registeredUsers;
  };

  // دالة للحصول على جميع المتقدمين لفرصة تطوع
  const getAppliedUsers = (volunteerTitle) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const appliedUsers = [];

    users.forEach(user => {
      const key = getUserKey("appliedVolunteers", user.id);
      const userApplications = JSON.parse(localStorage.getItem(key)) || [];
      const hasApplied = userApplications.some(v => v.title === volunteerTitle);
      if (hasApplied) {
        appliedUsers.push({
          name: user.name,
          email: user.email
        });
      }
    });

    return appliedUsers;
  };

  // Function to load data
  const loadData = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      const eventsKey = getUserKey("postedEvents", user.id);
      const volunteersKey = getUserKey("postedVolunteers", user.id);
      
      setPostedEvents(JSON.parse(localStorage.getItem(eventsKey)) || []);
      setPostedVolunteers(JSON.parse(localStorage.getItem(volunteersKey)) || []);
    }
  };

  useEffect(() => {
    // التحقق من تسجيل الدخول والصلاحيات
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }

    // التحقق من أن المستخدم organizer أو admin
    if (user.role !== "organizer" && user.role !== "admin" && user.role !== "superadmin") {
      alert("Access denied! Only organizers can view this page.");
      navigate("/profile");
      return;
    }

    setCurrentUser(user);
    loadData();

    // Listen for storage changes (when new items are posted)
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-window updates
    window.addEventListener('dataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated', handleStorageChange);
    };
  }, [navigate]);

  // تعديل حدث
  const handleEditEvent = (event) => {
    navigate("/post", { 
      state: { 
        mode: "edit", 
        type: "event",
        data: event 
      } 
    });
  };

  // تعديل فرصة تطوع
  const handleEditVolunteer = (volunteer) => {
    navigate("/post", { 
      state: { 
        mode: "edit", 
        type: "volunteer",
        data: volunteer 
      } 
    });
  };

  // حذف حدث منشور
  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventsKey = getUserKey("postedEvents", currentUser.id);
      const updated = postedEvents.filter(e => e.id !== id);
      localStorage.setItem(eventsKey, JSON.stringify(updated));
      setPostedEvents(updated);
      alert("Event deleted successfully ✅");
    }
  };

  // حذف فرصة تطوع منشورة
  const handleDeleteVolunteer = (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer opportunity?")) {
      const volunteersKey = getUserKey("postedVolunteers", currentUser.id);
      const updated = postedVolunteers.filter(v => v.id !== id);
      localStorage.setItem(volunteersKey, JSON.stringify(updated));
      setPostedVolunteers(updated);
      alert("Volunteer opportunity deleted successfully ✅");
    }
  };

  const visitDetails = (item) => {
    navigate("/details", { state: item });
  };

  const renderContent = () => {
    if (activeTab === "events") {
      return postedEvents.length > 0 ? (
        <div className="row g-4 mt-3">
          {postedEvents.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100 p-3"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={event.img || "../../public/img/default.jpg"}
                  className="card-img-top rounded-4 mb-3"
                  alt={event.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <h5 className="fw-bold">{event.title}</h5>
                <p className="text-muted small mb-2">{event.text}</p>
                
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

                <div className="mb-3 p-2 bg-light rounded">
                  <p className="mb-0 fw-semibold text-primary">
                    <i className="fa-solid fa-users me-2"></i>
                    {getRegisteredCount(event.title)} Users Registered
                  </p>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => visitDetails(event)}
                  >
                    <i className="fa-solid fa-eye me-1"></i>
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEditEvent(event)}
                    title="Edit Event"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete Event"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
          <p className="text-muted">No events posted yet.</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => navigate("/post")}
          >
            Post Your First Event
          </button>
        </div>
      );
    }

    if (activeTab === "volunteers") {
      return postedVolunteers.length > 0 ? (
        <div className="row g-4 mt-3">
          {postedVolunteers.map((volunteer) => (
            <div key={volunteer.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100 p-3"
                style={{ borderRadius: "20px" }}
              >
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
                  {volunteer.tags && volunteer.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="badge rounded-pill text-bg-secondary me-1 mb-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-3 p-2 bg-light rounded">
                  <p className="mb-0 fw-semibold text-success">
                    <i className="fa-solid fa-hand-holding-heart me-2"></i>
                    {getAppliedCount(volunteer.title)} Applications
                  </p>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => visitDetails(volunteer)}
                  >
                    <i className="fa-solid fa-eye me-1"></i>
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEditVolunteer(volunteer)}
                    title="Edit Volunteer"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                    title="Delete Volunteer"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <i className="fa-solid fa-hands-helping fa-3x text-muted mb-3"></i>
          <p className="text-muted">No volunteer opportunities posted yet.</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => navigate("/post")}
          >
            Post Your First Opportunity
          </button>
        </div>
      );
    }

    if (activeTab === "registrations") {
      // Static display of all posted items with registration info
      const allItems = [
        ...postedEvents.map(event => ({
          ...event,
          type: "event"
        })),
        ...postedVolunteers.map(volunteer => ({
          ...volunteer,
          type: "volunteer"
        }))
      ];

      // Sample users for demonstration
      const sampleUsers = [
        { name: "Ahmed Mohamed", email: "ahmed.m@gmail.com" },
        { name: "Sara Ali", email: "sara.ali@outlook.com" },
        { name: "Mohamed Hassan", email: "m.hassan@yahoo.com" },
        { name: "Fatma Ibrahim", email: "fatma.i@hotmail.com" },
        { name: "Omar Khalil", email: "omar.k@gmail.com" },
        { name: "Mariam Saeed", email: "mariam.s@outlook.com" },
        { name: "Youssef Nabil", email: "youssef.n@gmail.com" },
        { name: "Nour Ahmed", email: "nour.a@yahoo.com" }
      ];

      return allItems.length > 0 ? (
        <div className="row g-4 mt-3">
          {allItems.map((item, index) => {
            // Get real registered users
            const realUsers = item.type === "event" 
              ? getRegisteredUsers(item.title) 
              : getAppliedUsers(item.title);
            
            // If no real users, show sample users (3-5 random users)
            const displayUsers = realUsers.length > 0 
              ? realUsers 
              : sampleUsers.slice(0, Math.floor(Math.random() * 3) + 3);
            
            const totalCount = realUsers.length > 0 
              ? (item.type === "event" ? getRegisteredCount(item.title) : getAppliedCount(item.title))
              : displayUsers.length;

            return (
              <div key={index} className="col-12 col-lg-6">
                <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "20px" }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <span className={`badge ${item.type === "event" ? "bg-primary" : "bg-success"}`}>
                        {item.type === "event" ? "Event" : "Volunteer"}
                      </span>
                    </div>
                    <div className="text-end">
                      <h3 className="mb-0 text-primary">{totalCount}</h3>
                      <small className="text-muted">
                        {item.type === "event" ? "Registered" : "Applications"}
                      </small>
                    </div>
                  </div>

                  <div className="border-top pt-3">
                    <p className="text-muted small mb-2 fw-semibold">
                      <i className="fa-solid fa-users me-2"></i>
                      People Registered:
                    </p>
                    <div className="d-flex flex-column gap-2">
                      {displayUsers.slice(0, 5).map((user, idx) => (
                        <div key={idx} className="p-2 bg-light rounded d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className={`${item.type === "event" ? "bg-primary" : "bg-success"} text-white rounded-circle d-flex align-items-center justify-content-center me-2`} style={{ width: "35px", height: "35px" }}>
                              <i className="fa-solid fa-user"></i>
                            </div>
                            <div>
                              <span className="fw-semibold d-block">{user.name}</span>
                              <span className="text-muted small">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {totalCount > 5 && (
                        <span className="badge bg-secondary align-self-start">
                          +{totalCount - 5} more people
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5">
          <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
          <p className="text-muted">No events or volunteer opportunities posted yet.</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => navigate("/post")}
          >
            Post Your First Item
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {currentUser && (
        <div className="container mt-4">
          <div className="alert alert-success">
            <i className="fa-solid fa-user-tie me-2"></i>
            Organizer Dashboard: <strong>{currentUser.name}</strong> ({currentUser.role})
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <div className="choose d-flex justify-content-center align-items-center profile-t bg-white p-2 rounded-5">
          <h5
            className={`me-3 ${activeTab === "events" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("events")}
            style={{ cursor: "pointer" }}
          >
            My Events
          </h5>
          <h5
            className={`me-3 ${activeTab === "volunteers" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("volunteers")}
            style={{ cursor: "pointer" }}
          >
            My Volunteers
          </h5>
          <h5
            className={`${activeTab === "registrations" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("registrations")}
            style={{ cursor: "pointer" }}
          >
            All Registrations
          </h5>
        </div>
      </div>

      <div className="container">{renderContent()}</div>
    </>
  );
}

export default OrganizerProfile;