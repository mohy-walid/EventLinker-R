import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import userImg from "../assets/img/User.png";

function ProfileHead() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  
  // حقول الباسورد
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
      setFormData(currentUser);
    }
  }, []);

  // لما المستخدم يرفع صورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // حفظ التعديلات
  const handleSave = () => {
    // جلب كل المستخدمين
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    let updatedFormData = { ...formData };

    // التحقق من تغيير الباسورد
    if (oldPassword || newPassword || confirmNewPassword) {
      // التأكد من إدخال الحقول الثلاثة
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        alert("Please fill all password fields!");
        return;
      }

      // التحقق من الباسورد القديم
      if (oldPassword !== userData.password) {
        alert("Old password is incorrect!");
        return;
      }

      // التحقق من تطابق الباسورد الجديد
      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match!");
        return;
      }

      // التحقق من طول الباسورد الجديد
      if (newPassword.length < 6) {
        alert("New password must be at least 6 characters!");
        return;
      }

      // تحديث الباسورد
      updatedFormData.password = newPassword;
    }

    // تحديث بيانات المستخدم
    const updatedUsers = users.map((user) =>
      user.id === updatedFormData.id ? updatedFormData : user
    );

    // تخزينهم مرة تانية
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // تحديث currentUser
    localStorage.setItem("currentUser", JSON.stringify(updatedFormData));
    setUserData(updatedFormData);
    
    // إعادة تعيين حقول الباسورد
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    
    setShowModal(false);
    alert("Profile updated successfully! ✅");
  };

  if (!userData) {
    return <p className="text-center mt-4">Loading profile...</p>;
  }

  return (
    <>
      {/* ---------- Profile Section ---------- */}
      <div className="hero-sec row rounded mt-3 p-3 align-items-center bg-light shadow-sm">
        <div className="col-12 col-md-8 d-flex flex-column flex-md-row align-items-center mb-3 mb-md-0">
          <img
            src={userData.image ? userData.image : userImg}
            className="user-img rounded-circle mb-3 mb-md-0 me-md-3"
            alt="Profile"
          />

          <div className="text-center text-md-start">
            <h2 className="mb-1">{userData.name || "User Name"}</h2>
            <p className="mb-1">{userData.role || "User Role"}</p>
            <p className="mb-1 text-break">
              <i className="fa-regular fa-envelope"></i> {userData.email}
            </p>
            <p className="mb-0">
              <i className="fa-solid fa-phone"></i>{" "}
              {userData.phone || "+20 000-000-0000"}
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4 text-md-end text-center">
          <button
            type="button"
            className="btn btn-light rounded-5 px-4"
            onClick={() => setShowModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* ---------- Edit Profile Modal ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Form.Group>

            <hr className="my-4" />
            <h6 className="mb-3">Change Password (Optional)</h6>

            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Form.Group>

            <hr className="my-4" />

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {formData.image ? (
                <div className="text-center mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="form-img rounded-circle mb-2"
                  />
                  <br />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setFormData({ ...formData, image: "" })}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <img
                    src={userImg}
                    alt="Default"
                    className="user-img rounded-circle opacity-75"
                  />
                  <p className="small text-muted mt-1">(Default image)</p>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileHead;