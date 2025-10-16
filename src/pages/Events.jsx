
const eventsData = [
  {
    title: "Global Tech Summit 2024",
    text: "Innovating the Future of Technology",
    tags: ["Conference", "Oct 26, 9:00 AM", "Virtual - Online"],
    img: "/Event/img/events_card_1.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Annual Food Festival",
    text: "Journey Through Global Flavors",
    tags: ["Festival", "Nov 10, 11:00 AM", "City Park Arena"],
    img: "/Event/img/events_card_2.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Digital Marketing",
    text: "Strategies for new World",
    tags: ["Workshop", "Dec 05, 10:00 AM", "Convention Center"],
    img: "/Event/img/events_card_3.PNG",
    detailsLink: "/Event/html/details.html",
  },
  // Add all other events here similarly
];

const EventsPage = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="row align-items-center m-3 p-2">
        <div className="col col-sm-6 offset-sm-3 col-md-8 offset-md-2 text-center">
          <h1 className="fw-bold">
            Find Your Next Adventure: Register for Events That Inspire
          </h1>
          <p className="text-secondary">
            Discover events that educate, entertain, and connect. Don't just
            watch from the sidelines—join in
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className="filtration container-fluid py-2 w-100"
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

      {/* Events Cards */}
      <div className="row align-items-center justify-content-center m-2 p-2 g-5">
        {eventsData.map((event, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100" style={{ borderRadius: "20px" }}>
              <img
                src={event.img}
                className="card-img-top img-fluid"
                alt={event.title}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold d-flex">{event.title}</h5>
                <span className="d-flex justify-content-end p-2">
                  <i
                    className="fa-regular fa-bookmark fa-xl"
                    style={{ color: "#3D38C4" }}
                  ></i>
                </span>
                <p className="card-text">{event.text}</p>
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge rounded-pill text-bg-secondary me-1"
                  >
                    {tag}
                  </span>
                ))}
                <div className="d-flex justify-content-end mt-2">
                  <a
                    href={event.detailsLink}
                    className="btn btn-primary"
                    type="button"
                  >
                    Visit Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
