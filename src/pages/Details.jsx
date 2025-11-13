import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DetailsLay from "../layout/DetailsLayout";
import SpeakerLay from "../layout/SpeakerLay";
import AOS from "aos";
import "aos/dist/aos.css";

function EventDetails() {
  const location = useLocation();
  const event = location.state;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [status, setStatus] = useState("upcoming");

  useEffect(() => {
    if (!event) return;

    const eventDate = new Date(event.date.split(" - ")[0] || event.date).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        setStatus("upcoming");
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setStatus("finished");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  // ✅ لما المستخدم يضغط "Register Now"
  const handleRegister = () => {
    const stored = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    // منع تكرار نفس الحدث
    const exists = stored.some((e) => e.title === event.title);
    if (exists) {
      alert("You are already registered for this event!");
      return;
    }

    const newEvent = {
      title: event.title,
      date: event.date,
      location: event.place,
      img: event.img || "../../public/img/default.jpg", // احتياطي
    };

    const updated = [...stored, newEvent];
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    alert("Event registered successfully ✅");
  };

  if (!event) {
    return <h2 className="text-center mt-5">No Event Selected</h2>;
  }

  return (
    <>
      {/* ---------- Hero Section ---------- */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="overlay"></div>
        <div className="content text-white">
          <h1 className="fw-bold">{event.title}</h1>
        </div>
      </section>

      {/* ---------- Learn Section ---------- */}
      <section className="py-5" data-aos="fade-right" data-aos-delay="200">
        <div className="container">
          <div className="row align-items-stretch justify-content-center">
            {/* --- Event Info --- */}
            <div className="col-md-4 mb-4 animate-fadeInUp">
              <div className="p-4 bg-white shadow rounded h-100">
                {/* ✅ إضافة العنوان */}
                <h5 className="fw-bold mb-3 text-center">{event.title}</h5>

                <p>
                  <i className="fa-regular fa-calendar-days" style={{ color: "#000b58" }}></i>{" "}
                  {event.date}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot" style={{ color: "#000b58" }}></i>{" "}
                  {event.place}
                </p>
                <button className="btn btn-primary w-100" onClick={handleRegister}>
                  Register Now
                </button>
              </div>
            </div>

            {/* --- Countdown Timer --- */}
            <div className="col-md-6 mb-4">
              <div className="p-4 count-s shadow rounded h-100 text-center">
                <h5>
                  {status === "finished" ? "Event Finished" : "Event Starts In:"}
                </h5>

                <div className="d-flex justify-content-center gap-3 fs-4 fw-bold pt-4">
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

                {status === "finished" && (
                  <p className="text-danger mt-3 fw-bold">This event has finished 🎉</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DetailsLay />
      <SpeakerLay />
    </>
  );
}

export default EventDetails;
