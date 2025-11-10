import ProfileHead from "../layout/ProfileHead";
import { useEffect, useState } from "react";
import AdminProfile from "../components/AdminProfile";
import OrganizerProfile from "../components/OrganizerProfile";
import SuperAdminProfile from "../components/SuperAdminProfile";
import UserProfile from "../components/UserProfile";

function ProfilePage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // ✅ إنشاء حسابات تجريبية في localStorage (لو مش موجودة)
    const accounts = [
      {
        id: 4001,
        name: "Organizer Account",
        email: "organizer@gmail.com",
        role: "organizer",
        token: "dummy_token_organizer",
      },
      {
        id: 5001,
        name: "Admin Account",
        email: "admin@gmail.com",
        role: "admin",
        token: "dummy_token_admin",
      },
      {
        id: 6001,
        name: "Super Admin",
        email: "superadmin@gmail.com",
        role: "superadmin",
        token: "dummy_token_superadmin",
      },
    ];

    // احفظهم في localStorage لو مش موجودين
    accounts.forEach((acc) => {
      const key = acc.role + "_account";
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(acc));
      }
    });

    // لو فيه currentUser بالفعل خده
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.role) {
      setRole(currentUser.role);
      setEmail(currentUser.email);
    }
  }, []);

  // 🔁 تغيير المستخدم الحالي
  const handleUserChange = (e) => {
    const selectedRole = e.target.value;
    if (!selectedRole) return;

    const selectedAccount = JSON.parse(localStorage.getItem(selectedRole + "_account"));
    if (selectedAccount) {
      localStorage.setItem("currentUser", JSON.stringify(selectedAccount));
      setRole(selectedAccount.role);
      setEmail(selectedAccount.email);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row content">
          <main className="col-md-9 col-lg-10 px-md-4">
            <ProfileHead />

            {/* 🔽 Dropdown لتبديل الحساب */}
            <div className="mt-3">
              <label htmlFor="switchUser" className="fw-bold me-2">
                Switch Account:
              </label>
              <select
                id="switchUser"
                value={role}
                onChange={handleUserChange}
                className="form-select w-auto d-inline-block"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              {email && <p className="mt-2">Current: {email}</p>}
            </div>

            {/* عرض المحتوى حسب الدور */}
            {role === "user" && <UserProfile/>}
            {role === "organizer" && <OrganizerProfile/>}
            {role === "admin" && <AdminProfile/>}
            {role === "superadmin" && <SuperAdminProfile/>}
            {!role && <p className="mt-5 text-center">Loading profile...</p>}
          </main>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
