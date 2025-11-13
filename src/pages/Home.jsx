import { useNavigate } from "react-router-dom";
import CheckLogin from "../utils/CheckLog";
import ThreeBackground from "../components/ThreeBackground";
import "../css/Home.css";

function HomePage() {
  // حاطة هنا فانكشن
  const navigate = useNavigate();

  const handleBack = (event) => {
    if (location.pathname === "/home") {
      event.preventDefault();
      navigate("/home", { replace: true });
    }
  };

  const visitDetails = (event) => {
    navigate("/details", { state: event });
  };
  const isLogged = CheckLogin();

  if (isLogged) {
    window.addEventListener("popstate", handleBack);

    return (
      <>
        <ThreeBackground />

        {/* ---------- Hero Section ---------- */}
        <header className="text-center text-white">
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100 pt-5">
            <h1 className="display-4 fw-bold mb-4">
              Experience Unforgettable Events
            </h1>
            <p className="fs-4">
              Discover, register, and volunteer for amazing events happening
              around you. Your next adventure awaits!
            </p>
            <button
              className="btn btn-primary explore-btn"
              onClick={() => navigate("/events")}
            >
              Explore Events
            </button>
          </div>
        </header>

        {/* ---------- Upcoming Events ---------- */}
        <main>
          <section className="py-5">
            <div className="container">
              <h2 className="text-center mb-4 fs-1 fw-bold">Upcoming Events</h2>
              <div className="row g-4">
                {[
                  {
                    img: "../../public/img/1.png",
                    title: "Harmony Fest 2025",
                    date: "August 12 - 14, 2025",
                    place: "City Park Amphitheater",
                  },
                  {
                    img: "../../public/img/2.png",
                    title: "Global Tech Summit",
                    date: "September 5 - 7, 2025",
                    place: "Convention Center Hall A",
                  },
                  {
                    img: "../../public/img/3.png",
                    title: "Modern Art Exhibition",
                    date: "October 1 - 31, 2025",
                    place: "Downtown Gallery",
                  },
                  {
                    img: "../../public/img/4.png",
                    title: "Taste of the City Food Festival",
                    date: "November 9 - 10, 2025",
                    place: "Riverside Promenade",
                  },
                  {
                    img: "../../public/img/5.png",
                    title: "Annual Charity Run",
                    date: "December 1, 2024",
                    place: "Community Sports Arena",
                  },
                  {
                    img: "../../public/img/6.png",
                    title: "Winter Gala Extravaganza",
                    date: "December 24, 2025",
                    place: "Grand Ballroom Hotel",
                  },
                ].map((event, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <div className="card  home-card">
                      <img
                        src={event.img}
                        className="card-img-top"
                        alt={event.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">{event.date}</p>
                        <p className="card-text">{event.place}</p>
                        <button
                          className="btn btn-primary visit-btn"
                          onClick={() => visitDetails(event)}
                        >
                          Visit Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Testimonials ---------- */}
          <section className="container py-5">
            <h2 className="text-center mb-4 fs-1 fw-bold">
              What Our Community Says
            </h2>

            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row justify-content-center">
                    <Testimonial
                      text="This website made finding and registering for events incredibly easy. The interface is clean and intuitive!"
                      img="../../public/img/E1.jpg"
                      name="Sarah J."
                    />
                    <Testimonial
                      text="Volunteering opportunities are so well organized here. I found a perfect cause to contribute to."
                      img="../../public/img/J1.jpg"
                      name="Michael P."
                    />
                    <Testimonial
                      text="The event details are comprehensive, and the registration process was smooth and secure."
                      img="../../public/img/C1.jpg"
                      name="Emily R."
                    />
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <Testimonial
                      text="Great experience overall. I found new events and met amazing people."
                      img="../../public/img/E1.jpg"
                      name="David K."
                    />
                    <Testimonial
                      text="I love how easy it is to search and filter events by category."
                      img="../../public/img/J1.jpg"
                      name="Laura M."
                    />
                    <Testimonial
                      text="Perfect for finding volunteering and networking opportunities."
                      img="../../public/img/C1.jpg"
                      name="James H."
                    />
                  </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark rounded-circle p-2"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark rounded-circle p-2"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>

          {/* ---------- Stay Connected ---------- */}
          <section className="py-5 text-center">
            <div className="container">
              <h2 className="mb-4 fs-1 fw-bold">Stay Connected</h2>
              <p>
                Don't miss out on the latest events and volunteering
                opportunities. Sign up for our newsletter today!
              </p>

              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Enter your email</label>
                </div>
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

function Testimonial({ text, img, name }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm p-4 h-100 text-center">
        <p className="mb-4">“{text}”</p>
        <img
          src={img}
          alt={name}
          className="rounded-circle mx-auto mb-3"
          width="60"
          height="60"
        />
        <h6 className="fw-bold mb-0">{name}</h6>
      </div>
    </div>
  );
}

export default HomePage;
