function OrganizerProfile() {
  return (
    <>
      <div className="row g-3 profile-t">
        <div className="col-12 col-lg-6">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">My Created Events</h5>
            <p className="mb-1">Community Marathon</p>
            <p className="mb-0 fw-light">Total Registered Users: 48</p>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">User Registrations</h5>
            <p className="mb-1">Volunteer Fair — 62 participants</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrganizerProfile;
