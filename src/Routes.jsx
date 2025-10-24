import ContactPage from "./pages/Contact";
import EventsPage from "./pages/Events";
import HomePage from "./pages/Home";
import PostEventPage from "./pages/Post";
import LoginPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import VolunteerPage from "./pages/Volunteer";

const routes = [
    {
        path:"/",
        element: <LoginPage/>
    },
    {
        path:"/signup",
        element: <SignupPage/>
    },
    {
        path:"/home",
        element: <HomePage/>
    },
    {
        path:"/events",
        element: <EventsPage/>
    },
    {
        path:"/volunteer",
        element: <VolunteerPage/>
    },
    {
        path:"/contact",
        element: <ContactPage/>
    },
    {
        path:"/post",
        element: <PostEventPage/>
    }
    
];
export { routes };
