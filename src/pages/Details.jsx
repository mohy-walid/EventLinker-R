import { useEffect, useState } from "react";
import DetailsLay from "../layout/DetailsLayout";
import SpeakerLay from "../layout/SpeakerLay";
import AOS from "aos";
import "aos/dist/aos.css";


function EventDetails() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,     
      offset: 100,   
    });
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // حددي تاريخ بداية الحدث هنا
    const eventDate = new Date("December 26, 2025 09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ---------- Hero Section ---------- */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="overlay"></div>
        <div className="content text-white">
          <h1 className="fw-bold">Annual Tech Summit 2024</h1>
        </div>
      </section>

      {/* ---------- Learn Section ---------- */}
      <section className="py-5" data-aos="fade-right" data-aos-delay="200">
        <div className="container">
          <div className="row align-items-stretch justify-content-center">
            {/* --- Event Info --- */}
            <div className="col-md-4 mb-4 animate-fadeInUp">
              <div className="p-4 bg-white shadow rounded h-100">
                <p>
                  <i
                    className="fa-regular fa-calendar-days"
                    style={{ color: "#000b58" }}
                  ></i>{" "}
                  December 26-28, 2025
                </p>
                <p>
                  <i
                    className="fa-regular fa-clock"
                    style={{ color: "#000b58" }}
                  ></i>{" "}
                  9:00 AM - 5:00 PM (Daily)
                </p>
                <p>
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ color: "#000b58" }}
                  ></i>{" "}
                  Convention Center, Downtown
                </p>
                <a href="#" className="btn btn-primary">
                  Register Now
                </a>
              </div>
            </div>

            {/* --- Countdown Timer --- */}
            <div className="col-md-6 mb-4">
              <div className="p-4 count-s shadow rounded h-100 text-center">
                <h5>Event Starts In:</h5>
                <div
                  id="countdown"
                  className="d-flex justify-content-center gap-3 fs-4 fw-bold pt-4"
                >
                  <div className="fs-5">
                    <span>{timeLeft.days}</span> <br /> Days
                  </div>
                  <div className="fs-5">
                    <span>{timeLeft.hours}</span> <br /> Hrs
                  </div>
                  <div className="fs-5">
                    <span>{timeLeft.minutes}</span> <br /> Min
                  </div>
                  <div className="fs-5">
                    <span>{timeLeft.seconds}</span> <br /> Sec
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Details Section ---------- */}
      <DetailsLay />

      {/* ---------- Speakers Section ---------- */}
      <SpeakerLay />
    </>
  );
}

export default EventDetails;
