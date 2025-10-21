import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";

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
    }
  };

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
            <ProfileCard title={"Booked Events"} num={profile.bookedEvents}/>
            <ProfileCard title={"Saved Events"} num={profile.savedEvents}/>
            <ProfileCard title={"Volunteer Applications"} num={profile.volunteerApplications}/>
          </div>
        );

      case "organizer":
        return (
          <div className="row text-center mt-4">
            <ProfileCard title={"Posted Events"} num={profile.postedEvents} />
            <ProfileCard
              title={"Total Attendees"}
              num={profile.totalAttendees}
            />
            <ProfileCard
              title={"Feedback Received"}
              num={profile.feedbackReceived}
            />
          </div>
        );

      case "admin":
        return (
          <div className="row text-center mt-4">
            <ProfileCard title={"Pending Posts"} num={profile.pendingPosts} />
            <ProfileCard
              title={"Users to Verify"}
              num={profile.usersToVerify}
            />
            <ProfileCard
              title={"Flagged Reports"}
              num={profile.flaggedReports}
            />
          </div>
        );

      case "superadmin":
        return (
          <div className="row text-center mt-4">
            <ProfileCard title={"Total Admins"} num={profile.totalAdmins} />
            <ProfileCard title={"Total Users"} num={profile.totalUsers} />
            <ProfileCard title={"System Health"} num={profile.systemHealth} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5 ">
      <div className="card p-4 profile">
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
