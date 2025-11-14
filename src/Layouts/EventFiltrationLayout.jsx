function FiltrationSection() {
  return (
    <>
      <div
        className="filtration py-2 w-100"
        style={{
          backgroundColor: "white",
          border: "1px grey solid",
          borderRadius: "10px",
        }}
      >
        <div className="container">
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-md-start">
            <input
              type="text"
              placeholder="Search keywords..."
              className="form-control m-2"
              style={{ width: "600px" }}
            />
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                All Types
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Corporate Events
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Social Events
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Educational Events
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Community Events
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Any Date
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    July
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    November
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    October
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Any Location
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Fayoum
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Alexandria
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cairo
                  </a>
                </li>
              </ul>
            </div>

            <button
              className="btn btn-primary btn-sm d-flex justify-content-center align-items-center mx-auto ms-md-3 mt-2 mt-md-0"
              type="button"
              style={{ borderRadius: "10px", minWidth: "180px" }}
            >
              <i className="fa-solid fa-magnifying-glass me-2"></i>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltrationSection;