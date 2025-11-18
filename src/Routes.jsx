import EventDetails from "./pages/Details";
import ContactPage from "./pages/Contact";
import EventsPage from "./pages/Events";
import HomePage from "./pages/Home";
import PostEventPage from "./pages/Post";
import ProfilePage from "./pages/Profile";
import VolunteerPage from "./pages/Volunteer";
import LoginPage from "./pages/Signin";
import SignupPage from "./pages/Signup";

const routes = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/details",
    element: <EventDetails />
  },
  {
    path: "/events",
    element: <EventsPage />
  },
  {
    path: "/volunteer",
    element: <VolunteerPage />
  },
  {
    path: "/contact",
    element: <ContactPage />
  },
  {
    path: "/post",
    element: <PostEventPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
];
export { routes };
