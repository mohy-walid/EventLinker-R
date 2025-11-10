function UserProfile() {
  return (
    <>
      <div className="row g-3 profile-t">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">My Events</h5>
            <p className="mb-1">Annual Volunteer Summit</p>
            <p className="mb-0 fw-light">
              October 26, 2024 • 9:00 AM - 5:00 PM • Community Center
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">Registered Events</h5>
            <p className="mb-1">Local Charity Gala</p>
            <p className="mb-0 fw-light">
              September 15, 2024 • 7:00 PM • Grand Ballroom Hotel
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">Volunteering Programs</h5>
            <p className="mb-1">
              Youth Mentorship Program{" "}
              <span className="badge rounded-pill bg-success">Active</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
