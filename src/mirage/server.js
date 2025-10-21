import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  let server = createServer({
    models: {
      user: Model,
    },

    // بيانات افتراضية (seeds)
    seeds(server) {
      server.create("user", {
        id: 1,
        name: "Mohy",
        email: "mohy@email.com",
        password: "1234",
        role: "superadmin",
      });

      server.create("user", {
        id: 2,
        name: "Walaa",
        email: "walaa@email.com",
        password: "1234",
        role: "admin",
      });

      server.create("user", {
        id: 3,
        name: "Jana",
        email: "jana@email.com",
        password: "1234",
        role: "organizer",
      });

      server.create("user", {
        id: 4,
        name: "Yara",
        email: "yara@email.com",
        password: "1234",
        role: "user",
      });
    },

    routes() {
      this.namespace = "api";

      // 🧠 LOGIN
      this.post("/login", (schema, request) => {
        // هنا نفك الـ FormData اللي جاية من axios
        const params = new URLSearchParams(request.requestBody);
        const email = params.get("email");
        const password = params.get("password");

        const user = schema.users.findBy({ email, password });

        if (!user) {
          return new Response(
            401,
            {},
            { success: false, error: "Invalid credentials" }
          );
        }

        const fakeToken = btoa(`${user.email}:${Date.now()}`);

        return {
          success: true,
          token: fakeToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      });

      // 🧩 PROFILE DATA — مختلفة حسب الدور
      this.get("/profile/:id", (schema, request) => {
        const id = request.params.id;
        const user = schema.users.find(id);

        if (!user) {
          return new Response(
            404,
            {},
            { success: false, error: "User not found" }
          );
        }

        let baseProfile = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        let extraData = {};

        switch (user.role) {
          case "user":
            extraData = {
              bookedEvents: 12,
              savedEvents: 8,
              volunteerApplications: 3,
            };
            break;
          case "organizer":
            extraData = {
              postedEvents: 5,
              totalAttendees: 230,
              feedbackReceived: 18,
            };
            break;
          case "admin":
            extraData = {
              pendingPosts: 9,
              usersToVerify: 4,
              flaggedReports: 2,
            };
            break;
          case "superadmin":
            extraData = {
              totalAdmins: 3,
              totalUsers: 58,
              systemHealth: "Good",
            };
            break;
        }

        return { success: true, profile: { ...baseProfile, ...extraData } };
      });
    },
  });

  window.server = server;
  return server;
}
