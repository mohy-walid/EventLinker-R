function SuperAdminProfile() {
  return (
    <>
      <div className="row g-3 profile-t">
        <div className="col-12">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">Admin Management</h5>
            <p className="mb-1">You can add/remove admins</p>
          </div>
        </div>
        <div className="col-12">
          <div className="card-custom border rounded p-4 mt-4 h-100">
            <h5 className="mb-4">System Overview</h5>
            <p className="mb-0">
              Total Users: 250 • Organizers: 15 • Events: 40
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SuperAdminProfile;
