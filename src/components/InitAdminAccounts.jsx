import { useEffect } from "react";

function InitAdminAccounts() {
  useEffect(() => {
    // التحقق من وجود الحسابات الإدارية
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // الحسابات الإدارية الثابتة
    const adminAccounts = [
      {
        id: "admin_organizer_001",
        name: "Organizer Account",
        email: "organizer@eventlinker.com",
        phone: "1234567890",
        password: "organizer123",
        role: "organizer",
        createdAt: new Date().toISOString(),
      },
      {
        id: "admin_admin_002",
        name: "Admin Account",
        email: "admin@eventlinker.com",
        phone: "0987654321",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: "admin_superadmin_003",
        name: "Super Admin",
        email: "superadmin@eventlinker.com",
        phone: "1122334455",
        password: "superadmin123",
        role: "superadmin",
        createdAt: new Date().toISOString(),
      },
    ];

    // إضافة الحسابات فقط إذا لم تكن موجودة
    let updated = false;
    adminAccounts.forEach((admin) => {
      const exists = users.find((u) => u.email === admin.email);
      if (!exists) {
        users.push(admin);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem("users", JSON.stringify(users));
      console.log("✅ Admin accounts initialized successfully!");
    }
  }, []);

  return null; // هذا الكومبوننت لا يعرض شيء
}

export default InitAdminAccounts;