import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [organizerRequests, setOrganizerRequests] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // التحقق من تسجيل الدخول والصلاحيات
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }

    // التحقق من أن المستخدم admin أو superadmin
    if (user.role !== "admin" && user.role !== "superadmin") {
      alert("Access denied! Only admins can view this page.");
      navigate("/profile");
      return;
    }

    setCurrentUser(user);
    loadData();
  }, [navigate]);

  const loadData = () => {
    // Load organizer requests (users with role "pending_organizer")
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const requests = users.filter(u => u.role === "pending_organizer");
    setOrganizerRequests(requests);

    // Load all users
    setAllUsers(users);

    // Load pending events and volunteers (for future approval system)
    const allEvents = [];
    const allVolunteers = [];
    
    users.forEach(user => {
      const eventsKey = `postedEvents_${user.id}`;
      const volunteersKey = `postedVolunteers_${user.id}`;
      
      const userEvents = JSON.parse(localStorage.getItem(eventsKey)) || [];
      const userVolunteers = JSON.parse(localStorage.getItem(volunteersKey)) || [];
      
      // Add organizer info to each item
      userEvents.forEach(event => {
        allEvents.push({
          ...event,
          organizerId: user.id,
          organizerName: user.name,
          organizerEmail: user.email
        });
      });
      
      userVolunteers.forEach(volunteer => {
        allVolunteers.push({
          ...volunteer,
          organizerId: user.id,
          organizerName: user.name,
          organizerEmail: user.email
        });
      });
    });

    setPendingEvents(allEvents);
    setPendingVolunteers(allVolunteers);
  };

  // Approve organizer request
  const approveOrganizer = (userId) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: "organizer" } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current user if they approved themselves (edge case)
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user.id === userId) {
      const updatedCurrentUser = { ...user, role: "organizer" };
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    }
    
    loadData();
    alert("Organizer request approved! ✅");
  };

  // Reject organizer request
  const rejectOrganizer = (userId) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u => 
        u.id === userId ? { ...u, role: "user" } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      loadData();
      alert("Request rejected.");
    }
  };

  // Delete user
  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter(u => u.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Delete user's posted content
      localStorage.removeItem(`postedEvents_${userId}`);
      localStorage.removeItem(`postedVolunteers_${userId}`);
      localStorage.removeItem(`registeredEvents_${userId}`);
      localStorage.removeItem(`appliedVolunteers_${userId}`);
      
      loadData();
      alert("User deleted successfully.");
    }
  };

  // Change user role
  const changeUserRole = (userId, newRole) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadData();
    alert(`User role changed to ${newRole}!`);
  };

  const renderContent = () => {
    if (activeTab === "requests") {
      return (
        <div className="row g-4 mt-3">
          {organizerRequests.length > 0 ? (
            organizerRequests.map((request, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "20px" }}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: "50px", height: "50px" }}>
                      <i className="fa-solid fa-user-clock fa-lg"></i>
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">{request.name}</h5>
                      <span className="badge bg-warning text-dark">Pending Approval</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="mb-1 small">
                      <i className="fa-solid fa-envelope me-2 text-muted"></i>
                      {request.email}
                    </p>
                    <p className="mb-1 small">
                      <i className="fa-solid fa-phone me-2 text-muted"></i>
                      {request.phone}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-success flex-grow-1"
                      onClick={() => approveOrganizer(request.id)}
                    >
                      <i className="fa-solid fa-check me-1"></i>
                      Approve
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => rejectOrganizer(request.id)}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center mt-5">
                <i className="fa-solid fa-inbox fa-3x text-muted mb-3"></i>
                <p className="text-muted">No pending organizer requests.</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "events") {
      return (
        <div className="row g-4 mt-3">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100 p-3" style={{ borderRadius: "20px" }}>
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
                      <span key={i} className="badge rounded-pill text-bg-secondary me-1 mb-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-2 p-2 bg-light rounded">
                    <p className="mb-0 small">
                      <i className="fa-solid fa-user me-2"></i>
                      <strong>Organizer:</strong> {event.organizerName}
                    </p>
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <button className="btn btn-primary flex-grow-1">
                      <i className="fa-solid fa-eye me-1"></i>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center mt-5">
                <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
                <p className="text-muted">No events posted yet.</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "volunteers") {
      return (
        <div className="row g-4 mt-3">
          {pendingVolunteers.length > 0 ? (
            pendingVolunteers.map((volunteer, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100 p-3" style={{ borderRadius: "20px" }}>
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
                      <span key={i} className="badge rounded-pill text-bg-secondary me-1 mb-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-2 p-2 bg-light rounded">
                    <p className="mb-0 small">
                      <i className="fa-solid fa-user me-2"></i>
                      <strong>Organizer:</strong> {volunteer.organizerName}
                    </p>
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <button className="btn btn-success flex-grow-1">
                      <i className="fa-solid fa-eye me-1"></i>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center mt-5">
                <i className="fa-solid fa-hands-helping fa-3x text-muted mb-3"></i>
                <p className="text-muted">No volunteer opportunities posted yet.</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "users") {
      return (
        <div className="row g-4 mt-3">
          <div className="col-12">
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "20px" }}>
              <h5 className="fw-bold mb-3">
                <i className="fa-solid fa-users me-2"></i>
                All Users ({allUsers.length})
              </h5>
              
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="fw-semibold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span className={`badge ${
                            user.role === "superadmin" ? "bg-danger" :
                            user.role === "admin" ? "bg-warning text-dark" :
                            user.role === "organizer" ? "bg-primary" :
                            user.role === "pending_organizer" ? "bg-secondary" :
                            "bg-success"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button 
                              className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                              type="button" 
                              data-bs-toggle="dropdown"
                            >
                              Actions
                            </button>
                            <ul className="dropdown-menu">
                              {user.role !== "superadmin" && currentUser.role === "superadmin" && (
                                <>
                                  <li>
                                    <button 
                                      className="dropdown-item"
                                      onClick={() => changeUserRole(user.id, "admin")}
                                    >
                                      Make Admin
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item"
                                      onClick={() => changeUserRole(user.id, "organizer")}
                                    >
                                      Make Organizer
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item"
                                      onClick={() => changeUserRole(user.id, "user")}
                                    >
                                      Make Regular User
                                    </button>
                                  </li>
                                  <li><hr className="dropdown-divider" /></li>
                                </>
                              )}
                              <li>
                                <button 
                                  className="dropdown-item text-danger"
                                  onClick={() => deleteUser(user.id)}
                                  disabled={user.id === currentUser.id}
                                >
                                  Delete User
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {currentUser && (
        <div className="container mt-4">
          <div className="alert alert-warning">
            <i className="fa-solid fa-user-shield me-2"></i>
            Admin Dashboard: <strong>{currentUser.name}</strong> ({currentUser.role})
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="container mt-3">
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: "15px" }}>
              <i className="fa-solid fa-user-clock fa-2x text-warning mb-2"></i>
              <h3 className="mb-0">{organizerRequests.length}</h3>
              <small className="text-muted">Pending Requests</small>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: "15px" }}>
              <i className="fa-solid fa-calendar fa-2x text-primary mb-2"></i>
              <h3 className="mb-0">{pendingEvents.length}</h3>
              <small className="text-muted">Total Events</small>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: "15px" }}>
              <i className="fa-solid fa-hand-holding-heart fa-2x text-success mb-2"></i>
              <h3 className="mb-0">{pendingVolunteers.length}</h3>
              <small className="text-muted">Total Volunteers</small>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: "15px" }}>
              <i className="fa-solid fa-users fa-2x text-info mb-2"></i>
              <h3 className="mb-0">{allUsers.length}</h3>
              <small className="text-muted">Total Users</small>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="d-flex justify-content-center mt-4">
        <div className="choose d-flex justify-content-center align-items-center profile-t bg-white p-2 rounded-5">
          <h5
            className={`me-3 ${activeTab === "requests" ? "text-warning" : ""}`}
            onClick={() => setActiveTab("requests")}
            style={{ cursor: "pointer" }}
          >
            Requests
          </h5>
          <h5
            className={`me-3 ${activeTab === "events" ? "text-primary" : ""}`}
            onClick={() => setActiveTab("events")}
            style={{ cursor: "pointer" }}
          >
            All Events
          </h5>
          <h5
            className={`me-3 ${activeTab === "volunteers" ? "text-success" : ""}`}
            onClick={() => setActiveTab("volunteers")}
            style={{ cursor: "pointer" }}
          >
            All Volunteers
          </h5>
          <h5
            className={`${activeTab === "users" ? "text-info" : ""}`}
            onClick={() => setActiveTab("users")}
            style={{ cursor: "pointer" }}
          >
            Manage Users
          </h5>
        </div>
      </div>

      <div className="container">{renderContent()}</div>
    </>
  );
}

export default AdminProfile;