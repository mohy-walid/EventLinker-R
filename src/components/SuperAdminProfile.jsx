import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuperAdminProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    organizers: 0,
    regularUsers: 0,
    pendingRequests: 0,
    totalEvents: 0,
    totalVolunteers: 0,
  });

  useEffect(() => {
    // التحقق من تسجيل الدخول والصلاحيات
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }

    // التحقق من أن المستخدم superadmin فقط
    if (user.role !== "superadmin") {
      alert("Access denied! Only superadmins can view this page.");
      navigate("/profile");
      return;
    }

    setCurrentUser(user);
    loadData();
  }, [navigate]);

  const loadData = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setAllUsers(users);

    // Calculate statistics
    const totalUsers = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const organizers = users.filter((u) => u.role === "organizer").length;
    const regularUsers = users.filter((u) => u.role === "user").length;
    const pendingRequests = users.filter(
      (u) => u.role === "pending_organizer"
    ).length;

    // Count all events and volunteers
    let totalEvents = 0;
    let totalVolunteers = 0;

    users.forEach((user) => {
      const eventsKey = `postedEvents_${user.id}`;
      const volunteersKey = `postedVolunteers_${user.id}`;

      const userEvents = JSON.parse(localStorage.getItem(eventsKey)) || [];
      const userVolunteers =
        JSON.parse(localStorage.getItem(volunteersKey)) || [];

      totalEvents += userEvents.length;
      totalVolunteers += userVolunteers.length;
    });

    setStats({
      totalUsers,
      admins,
      organizers,
      regularUsers,
      pendingRequests,
      totalEvents,
      totalVolunteers,
    });
  };

  // Promote user to admin
  const promoteToAdmin = (userId) => {
    if (window.confirm("Are you sure you want to make this user an admin?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === userId ? { ...u, role: "admin" } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      loadData();
      alert("User promoted to Admin! ✅");
    }
  };

  // Demote admin to regular user
  const demoteAdmin = (userId) => {
    if (window.confirm("Are you sure you want to remove admin privileges?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === userId ? { ...u, role: "user" } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      loadData();
      alert("Admin demoted to regular user.");
    }
  };

  // Change user role
  const changeUserRole = (userId, newRole) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update current user if changed
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, role: newRole };
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    }

    loadData();
    alert(`User role changed to ${newRole}! ✅`);
  };

  // Delete user
  const deleteUser = (userId) => {
    if (
      window.confirm(
        "⚠️ WARNING: This will permanently delete the user and all their data. Are you sure?"
      )
    ) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter((u) => u.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Delete all user data
      localStorage.removeItem(`postedEvents_${userId}`);
      localStorage.removeItem(`postedVolunteers_${userId}`);
      localStorage.removeItem(`registeredEvents_${userId}`);
      localStorage.removeItem(`appliedVolunteers_${userId}`);

      loadData();
      alert("User deleted successfully.");
    }
  };

  // Clear all data (dangerous!)
  const clearAllData = () => {
    const confirmText = prompt(
      "⚠️ DANGER ZONE ⚠️\nThis will delete ALL users, events, and data!\nType 'DELETE EVERYTHING' to confirm:"
    );

    if (confirmText === "DELETE EVERYTHING") {
      // Keep only the current superadmin
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      localStorage.clear();
      localStorage.setItem("users", JSON.stringify([currentUser]));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      loadData();
      alert("All data cleared! Only your account remains.");
    } else {
      alert("Action cancelled.");
    }
  };

  const renderContent = () => {
    if (activeTab === "overview") {
      return (
        <div className="row g-4 mt-3">
          {/* Main Statistics Grid */}
          <div className="col-12">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-3">
                <div
                  className="card border-0 shadow-sm p-4 text-center"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <i className="fa-solid fa-users fa-3x text-white mb-3"></i>
                  <h2 className="mb-0 text-white fw-bold">
                    {stats.totalUsers}
                  </h2>
                  <p className="text-white mb-0">Total Users</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div
                  className="card border-0 shadow-sm p-4 text-center"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #f6befcff 0%, #906369ff 100%)",
                  }}
                >
                  <i className="fa-solid fa-user-shield fa-3x text-white mb-3"></i>
                  <h2 className="mb-0 text-white fw-bold">{stats.admins}</h2>
                  <p className="text-white mb-0">Admins</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div
                  className="card border-0 shadow-sm p-4 text-center"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #cbe1f4ff 0%, #3f5e60ff 100%)",
                  }}
                >
                  <i className="fa-solid fa-user-tie fa-3x text-white mb-3"></i>
                  <h2 className="mb-0 text-white fw-bold">
                    {stats.organizers}
                  </h2>
                  <p className="text-white mb-0">Organizers</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div
                  className="card border-0 shadow-sm p-4 text-center"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #a6f3c0ff 0%, #34695fff 100%)",
                  }}
                >
                  <i className="fa-solid fa-user fa-3x text-white mb-3"></i>
                  <h2 className="mb-0 text-white fw-bold">
                    {stats.regularUsers}
                  </h2>
                  <p className="text-white mb-0">Regular Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Statistics */}
          <div className="col-12 col-md-6">
            <div
              className="card shadow-sm border-0 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">
                <i className="fa-solid fa-chart-line me-2 text-primary"></i>
                Content Statistics
              </h5>
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div>
                  <i className="fa-solid fa-calendar-days fa-2x text-primary"></i>
                  <span className="ms-3 fw-semibold">Total Events</span>
                </div>
                <h3 className="mb-0 text-primary">{stats.totalEvents}</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div>
                  <i className="fa-solid fa-hand-holding-heart fa-2x text-success"></i>
                  <span className="ms-3 fw-semibold">Total Volunteers</span>
                </div>
                <h3 className="mb-0 text-success">{stats.totalVolunteers}</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <i className="fa-solid fa-user-clock fa-2x text-warning"></i>
                  <span className="ms-3 fw-semibold">Pending Requests</span>
                </div>
                <h3 className="mb-0 text-warning">{stats.pendingRequests}</h3>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-12 col-md-6">
            <div
              className="card shadow-sm border-0 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">
                <i className="fa-solid fa-bolt me-2 text-warning"></i>
                Quick Actions
              </h5>
              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setActiveTab("admins")}
                >
                  <i className="fa-solid fa-user-shield me-2"></i>
                  Manage Admins
                </button>
                <button
                  className="btn btn-info btn-lg"
                  onClick={() => setActiveTab("users")}
                >
                  <i className="fa-solid fa-users-cog me-2"></i>
                  Manage All Users
                </button>
                <button
                  className="btn btn-warning btn-lg"
                  onClick={() => navigate("/post")}
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Create Event/Volunteer
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="col-12">
            <div
              className="card shadow-sm border-danger p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-3 text-danger">
                <i className="fa-solid fa-exclamation-triangle me-2"></i>
                Danger Zone
              </h5>
              <p className="text-muted mb-3">
                These actions are irreversible. Use with extreme caution.
              </p>
              <button className="btn btn-danger" onClick={clearAllData}>
                <i className="fa-solid fa-trash me-2"></i>
                Clear All System Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "admins") {
      const admins = allUsers.filter((u) => u.role === "admin");
      const nonAdmins = allUsers.filter(
        (u) => u.role !== "admin" && u.role !== "superadmin"
      );

      return (
        <div className="row g-4 mt-3">
          {/* Current Admins */}
          <div className="col-12">
            <div
              className="card shadow-sm border-0 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">
                <i className="fa-solid fa-user-shield me-2 text-danger"></i>
                Current Admins ({admins.length})
              </h5>

              {admins.length > 0 ? (
                <div className="row g-3">
                  {admins.map((admin, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                      <div className="card border p-3">
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{ width: "50px", height: "50px" }}
                          >
                            <i className="fa-solid fa-user-shield fa-lg"></i>
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{admin.name}</h6>
                            <span className="badge bg-danger">Admin</span>
                          </div>
                        </div>
                        <p className="mb-1 small">
                          <i className="fa-solid fa-envelope me-2"></i>
                          {admin.email}
                        </p>
                        <p className="mb-2 small">
                          <i className="fa-solid fa-phone me-2"></i>
                          {admin.phone}
                        </p>
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => demoteAdmin(admin.id)}
                        >
                          <i className="fa-solid fa-arrow-down me-1"></i>
                          Remove Admin
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fa-solid fa-inbox fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No admins yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Promote Users to Admin */}
          <div className="col-12">
            <div
              className="card shadow-sm border-0 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">
                <i className="fa-solid fa-arrow-up me-2 text-success"></i>
                Promote Users to Admin
              </h5>

              {nonAdmins.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nonAdmins.map((user, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span
                              className={`badge ${
                                user.role === "organizer"
                                  ? "bg-primary"
                                  : user.role === "pending_organizer"
                                  ? "bg-secondary"
                                  : "bg-success"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => promoteToAdmin(user.id)}
                            >
                              <i className="fa-solid fa-arrow-up me-1"></i>
                              Make Admin
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">All users are already admins.</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "users") {
      return (
        <div className="row g-4 mt-3">
          <div className="col-12">
            <div
              className="card shadow-sm border-0 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">
                <i className="fa-solid fa-users-cog me-2 text-info"></i>
                All Users Management ({allUsers.length})
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
                        <td className="fw-semibold">
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="badge bg-info ms-2">You</span>
                          )}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "superadmin"
                                ? "bg-dark"
                                : user.role === "admin"
                                ? "bg-danger"
                                : user.role === "organizer"
                                ? "bg-primary"
                                : user.role === "pending_organizer"
                                ? "bg-secondary"
                                : "bg-success"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.role !== "superadmin" ? (
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                Manage
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      changeUserRole(user.id, "admin")
                                    }
                                  >
                                    <i className="fa-solid fa-user-shield me-2"></i>
                                    Make Admin
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      changeUserRole(user.id, "organizer")
                                    }
                                  >
                                    <i className="fa-solid fa-user-tie me-2"></i>
                                    Make Organizer
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      changeUserRole(user.id, "user")
                                    }
                                  >
                                    <i className="fa-solid fa-user me-2"></i>
                                    Make User
                                  </button>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => deleteUser(user.id)}
                                  >
                                    <i className="fa-solid fa-trash me-2"></i>
                                    Delete User
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <span className="badge bg-dark">Protected</span>
                          )}
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
          <div className="alert alert-dark">
            <i className="fa-solid fa-crown me-2"></i>
            SuperAdmin Control Panel: <strong>{currentUser.name}</strong>
            <span className="badge bg-dark ms-2">Highest Privilege</span>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="d-flex justify-content-center mt-4">
        <div className="choose d-flex justify-content-center align-items-center profile-t bg-white p-2 rounded-5">
          <h5
            className={`me-3 ${activeTab === "overview" ? "text-dark" : ""}`}
            onClick={() => setActiveTab("overview")}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-chart-pie me-1"></i>
            Overview
          </h5>
          <h5
            className={`me-3 ${activeTab === "admins" ? "text-danger" : ""}`}
            onClick={() => setActiveTab("admins")}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-user-shield me-1"></i>
            Admin Management
          </h5>
          <h5
            className={`${activeTab === "users" ? "text-info" : ""}`}
            onClick={() => setActiveTab("users")}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-users-cog me-1"></i>
            All Users
          </h5>
        </div>
      </div>

      <div className="container">{renderContent()}</div>
    </>
  );
}

export default SuperAdminProfile;
