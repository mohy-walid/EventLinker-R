import ContactPage from "./pages/Contact";
import EventsPage from "./pages/Events";
import HomePage from "./pages/Home";
import PostEventPage from "./pages/Post";
import VolunteerPage from "./pages/Volunteer";

const routes = [
    {
        path:"/",
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
