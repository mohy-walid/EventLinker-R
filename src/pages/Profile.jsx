import { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderStats(); 
      case "booked":
        return <div>📅 Your Booked Events</div>;
      case "saved":
        return <div>💾 Your Saved Events</div>;
      default:
        return null;
    }}

  useEffect(() => {
    axios
      .get(`/api/profile/${userId}`)
      .then((res) => {
        setProfile(res.data.profile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  const renderStats = () => {
    switch (profile.role) {
      case "user":
        return (
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Booked Events</h6>
                <h4>{profile.bookedEvents}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Saved Events</h6>
                <h4>{profile.savedEvents}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Volunteer Applications</h6>
                <h4>{profile.volunteerApplications}</h4>
              </div>
            </div>
          </div>
        );

      case "organizer":
        return (
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Posted Events</h6>
                <h4>{profile.postedEvents}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Total Attendees</h6>
                <h4>{profile.totalAttendees}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Feedback Received</h6>
                <h4>{profile.feedbackReceived}</h4>
              </div>
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Pending Posts</h6>
                <h4>{profile.pendingPosts}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Users to Verify</h6>
                <h4>{profile.usersToVerify}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Flagged Reports</h6>
                <h4>{profile.flaggedReports}</h4>
              </div>
            </div>
          </div>
        );

      case "superadmin":
        return (
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Total Admins</h6>
                <h4>{profile.totalAdmins}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Total Users</h6>
                <h4>{profile.totalUsers}</h4>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>System Health</h6>
                <h4>{profile.systemHealth}</h4>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5 profile">
      <div className="card p-4 shadow-sm">
        <div className="d-flex align-items-center mb-4">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center profile-icon">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="ms-3">
            <h4 className="mb-0">{profile.name}</h4>
            <p className="mb-0 text-muted">{profile.email}</p>
            <span className="badge bg-light text-dark mt-1">
              {profile.role.toUpperCase()}
            </span>
          </div>
          <div className="ms-auto">
            <button className="btn btn-outline-primary">Edit Profile</button>
          </div>
        </div>

        <hr />
         <div className="over-box d-flex justify-content-center align-items-center mt-5">
        <div className="over-btn">
          <button
            className={activeTab === "overview" ? "active-btn" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "booked" ? "active-btn" : ""}
            onClick={() => setActiveTab("booked")}
          >
            Booked Events
          </button>
          <button
            className={activeTab === "saved" ? "active-btn" : ""}
            onClick={() => setActiveTab("saved")}
          >
            Saved Events
          </button>
        </div>
      </div>

      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
        
      </div>
  );
}

export default ProfilePage;
