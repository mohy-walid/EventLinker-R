import { useRoutes, useLocation } from "react-router-dom";
import "./App.css";
import FooterLayout from "./components/Footer";
import NavbarLayout from "./components/Navbar";
import { routes } from "./Routes";
import ThreeBackground from "./components/ThreeBackground";
import InitAdminAccounts from "./components/InitAdminAccounts"; // ✅ Add this import
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();
  
  // المسارات اللي مش عايزين فيها Navbar/Footer
  const noLayoutRoutes = ["/", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);
  
  return (
    <>
      <InitAdminAccounts /> {/* ✅ Add this line - it will auto-create admin accounts */}
      <ThreeBackground />
      {!hideLayout && <NavbarLayout />}
      {element}
      <FooterLayout />
    </>
  );
}

export default App;