import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const logOut =()=>{
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo d-flex">
          <img src="../../public/img/9c5e0db0-ca21-47c4-b07a-4215d667ad16_62f9708f-375c-48ad-b0d7-4109d9248ce7_1406497_image.svg" alt="" />
          <h3 className="ms-2">EventLinker</h3>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/events" className="nav-link">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/volunteer" className="nav-link">
                Volunteer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className="d-flex p-2">
            <NavLink
              to="/post"
              className="btn btn-outline mx-2 rounded-5 d-flex align-items-center"
            >
              Post Your Event
            </NavLink>
            <NavLink
              to="/profile"
              className="btn btn-primary me-2 rounded-5 d-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-user-group"></i> Profile
            </NavLink>
           <NavLink
              to="/"
              className="logout-btn d-flex align-items-center justify-content-center"
            >
              <i className="fa-solid fa-arrow-right-from-bracket" onClick={logOut}></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
