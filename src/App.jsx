import { useRoutes, useLocation } from "react-router-dom";
import "./App.css";
import FooterLayout from "./components/Footer";
import NavbarLayout from "./components/Navbar";
import { routes } from "./Routes";
import ThreeBackground from "./components/ThreeBackground";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  // المسارات اللي مش عايزين فيها Navbar/Footer
  const noLayoutRoutes = ["/" , "/signup"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ThreeBackground />
      {!hideLayout && <NavbarLayout />}
      {element}
      {<FooterLayout />}
    </>
  );
}

export default App;
