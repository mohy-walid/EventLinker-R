function AdminProfile() {
  return (
    <>
      <div className="row g-3 profile-t">
        <div className="col-12 col-lg-4">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">Pending Organizer Requests</h5>
            <p className="mb-1">Ahmed Ali - waiting approval</p>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">Pending Event Posts</h5>
            <p className="mb-1">Charity Clean-up • Pending</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminProfile;
