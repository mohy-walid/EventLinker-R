import EventsPage from "./pages/Events";
import HomePage from "./pages/Home";

const routes = [
    {
        path:"/",
        element: <HomePage/>
    },
    {
        path:"/events",
        element: <EventsPage/>
    }
];
export { routes };
