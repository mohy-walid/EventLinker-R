import { useRoutes, useLocation } from 'react-router-dom'
import './App.css'
import FooterLayout from './components/Footer'
import NavbarLayout from './components/Navbar'
import { routes } from './Routes'

function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  // المسارات اللي مش عايزين فيها Navbar/Footer
  const noLayoutRoutes = ["/"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <NavbarLayout />}
      {element}
      {<FooterLayout />}
    </>
  )
}

export default App;
