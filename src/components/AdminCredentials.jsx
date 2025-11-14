import { useState } from "react";

function AdminCredentials() {
  const [show, setShow] = useState(false);

  const credentials = [
    {
      role: "Organizer",
      email: "organizer@eventlinker.com",
      password: "organizer123",
      color: "primary",
      icon: "fa-calendar-plus",
    },
    {
      role: "Admin",
      email: "admin@eventlinker.com",
      password: "admin123",
      color: "warning",
      icon: "fa-user-shield",
    },
    {
      role: "Super Admin",
      email: "superadmin@eventlinker.com",
      password: "superadmin123",
      color: "danger",
      icon: "fa-crown",
    },
  ];

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 9999 }}>
      {/* زر لإظهار/إخفاء البيانات */}
      <button
        className="btn btn-dark btn-sm rounded-circle shadow"
        onClick={() => setShow(!show)}
        style={{ width: "50px", height: "50px" }}
        title="Show Admin Credentials"
      >
        <i className={`fa-solid ${show ? "fa-times" : "fa-key"}`}></i>
      </button>

      {/* عرض البيانات */}
      {show && (
        <div
          className="card shadow-lg mt-2"
          style={{
            width: "350px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <div className="card-header bg-dark text-white">
            <h6 className="mb-0">
              <i className="fa-solid fa-user-lock me-2"></i>
              Admin Test Accounts
            </h6>
          </div>
          <div className="card-body p-2">
            {credentials.map((cred, index) => (
              <div
                key={index}
                className={`alert alert-${cred.color} mb-2 p-2`}
                role="alert"
              >
                <div className="d-flex align-items-center mb-2">
                  <i className={`fa-solid ${cred.icon} me-2`}></i>
                  <strong>{cred.role}</strong>
                </div>
                <div className="small">
                  <div className="mb-1">
                    <i className="fa-solid fa-envelope me-2"></i>
                    <code className="text-dark">{cred.email}</code>
                  </div>
                  <div>
                    <i className="fa-solid fa-lock me-2"></i>
                    <code className="text-dark">{cred.password}</code>
                  </div>
                </div>
              </div>
            ))}
            <div className="alert alert-info mb-0 p-2 small">
              <i className="fa-solid fa-info-circle me-2"></i>
              Use these credentials to test different roles
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCredentials;