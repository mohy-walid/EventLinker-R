import EventDetails from "./pages/details";
import HomePage from "./pages/Home";

const routes = [
    {
        path:"/home",
        element: <HomePage/>
    },
    {
        path:"/details",
        element: <EventDetails/>
    }
];
export { routes };
