import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  let server = createServer({
    models: {
      user: Model,
    },

    // 🧩 بيانات افتراضية (seeds)
    seeds(server) {
      server.create("user", {
        id: 1,
        name: "Yara",
        email: "yara@email.com",
        password: "1234",
        role: "superadmin",
      });

      server.create("user", {
        id: 2,
        name: "Omar",
        email: "omar@email.com",
        password: "1234",
        role: "admin",
      });

      server.create("user", {
        id: 3,
        name: "Laila",
        email: "laila@email.com",
        password: "1234",
        role: "organizer",
      });

      server.create("user", {
        id: 4,
        name: "Mostafa",
        email: "mostafa@email.com",
        password: "1234",
        role: "user",
      });
    },

    // ⚙️ تعريف الـ API routes
    routes() {
      this.namespace = "api";

      // ✅ Middleware بسيط للتحقق من وجود token
      this.get("/users", (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;

        if (!authHeader) {
          return new Response(
            401,
            {},
            { success: false, error: "Unauthorized: No token provided" }
          );
        }

        return schema.users.all();
      });

      // 🔐 تسجيل الدخول
      this.post("/login", (schema, request) => {
        let email, password;

        try {
          // لو جاي JSON
          ({ email, password } = JSON.parse(request.requestBody));
        } catch {
          // أو FormData
          const params = new URLSearchParams(request.requestBody);
          email = params.get("email");
          password = params.get("password");
        }

        const user = schema.users.findBy({ email, password });

        if (!user) {
          return new Response(
            401,
            {},
            { success: false, error: "Invalid email or password" }
          );
        }

        // توليد token وهمي
        const fakeToken = btoa(`${user.email}:${Date.now()}`);

        return {
          success: true,
          message: `Welcome ${user.name}`,
          token: fakeToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      });

      // 📝 تسجيل مستخدم جديد
      this.post("/register", (schema, request) => {
        let data;

        try {
          data = JSON.parse(request.requestBody);
        } catch {
          const params = new URLSearchParams(request.requestBody);
          data = Object.fromEntries(params.entries());
        }

        if (schema.users.findBy({ email: data.email })) {
          return new Response(
            400,
            {},
            { success: false, error: "Email already exists" }
          );
        }

        const newUser = schema.users.create({
          ...data,
          role: data.role || "user",
        });

        const fakeToken = btoa(`${newUser.email}:${Date.now()}`);

        return {
          success: true,
          message: "User created successfully",
          token: fakeToken,
          user: newUser,
        };
      });
    },
  });

  return server;
}
