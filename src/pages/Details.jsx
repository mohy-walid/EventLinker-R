import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsLay from "../Layouts/DetailsLayout";
import SpeakerLay from "../Layouts/SpeakerLay";
import AOS from "aos";
import "aos/dist/aos.css";

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
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

  // دالة للحصول على مفتاح خاص بالمستخدم
  const getUserKey = (baseKey) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return null;
    return `${baseKey}_${user.id}`;
  };

  // ✅ تحديد نوع الصفحة (event أو volunteer)
  const isVolunteer = event?.org !== undefined;

  useEffect(() => {
    if (!event) return;

    // ✅ استخراج التاريخ من tags للـ volunteers أو من date للـ events
    let eventDateString;
    if (isVolunteer) {
      // البحث عن التاريخ في tags (مثل "October 26, 2024")
      eventDateString = event.tags.find(tag => tag.match(/\w+ \d+, \d{4}/));
    } else {
      eventDateString = event.date.split(" - ")[0] || event.date;
    }

    if (!eventDateString || eventDateString === "Ongoing") {
      setStatus("ongoing");
      return;
    }

    const eventDate = new Date(eventDateString).getTime();

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
  }, [event, isVolunteer]);

  // ✅ عند الضغط على Register Now (للأحداث)
  const handleRegister = () => {
    // التحقق من تسجيل الدخول
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login to register for events!");
      navigate("/");
      return;
    }

    // الحصول على المفتاح الخاص بالمستخدم
    const registeredKey = getUserKey("registeredEvents");
    const stored = JSON.parse(localStorage.getItem(registeredKey)) || [];

    const exists = stored.some((e) => e.title === event.title);
    if (exists) {
      alert("You are already registered for this event!");
      return;
    }

    const newEvent = {
      title: event.title,
      date: event.date,
      location: event.place,
      img: event.img || "../../public/img/default.jpg",
    };

    const updated = [...stored, newEvent];
    localStorage.setItem(registeredKey, JSON.stringify(updated));
    alert("Event registered successfully ✅");
  };

  // ✅ عند الضغط على Apply (للتطوع)
  const handleApply = () => {
    // التحقق من تسجيل الدخول
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login to apply for volunteer opportunities!");
      navigate("/");
      return;
    }

    // الحصول على المفتاح الخاص بالمستخدم
    const appliedKey = getUserKey("appliedVolunteers");
    const stored = JSON.parse(localStorage.getItem(appliedKey)) || [];

    const exists = stored.some((v) => v.title === event.title);
    if (exists) {
      alert("You have already applied for this volunteer opportunity!");
      return;
    }

    const newVolunteer = {
      title: event.title,
      org: event.org,
      tags: event.tags,
      img: event.img || "../../public/img/default.jpg",
      description: event.description,
    };

    const updated = [...stored, newVolunteer];
    localStorage.setItem(appliedKey, JSON.stringify(updated));
    alert("Application submitted successfully ✅");
  };

  if (!event) {
    return <h2 className="text-center mt-5">No Event Selected</h2>;
  }

  // ✅ استخراج التاريخ والموقع
  const displayDate = isVolunteer 
    ? event.tags.find(tag => tag.match(/\w+ \d+, \d{4}|Ongoing/)) || "Date TBD"
    : event.date;
  
  const displayLocation = isVolunteer
    ? event.tags[event.tags.length - 1] // آخر tag غالبًا الموقع
    : event.place;

  return (
    <>
      {/* ---------- Hero Section ---------- */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="overlay"></div>
        <div className="content text-white">
          <h1 className="fw-bold">{event.title}</h1>
          {isVolunteer && <p className="fs-5 mt-2">{event.org}</p>}
        </div>
      </section>

      {/* ---------- Learn Section ---------- */}
      <section className="py-5" data-aos="fade-right" data-aos-delay="200">
        <div className="container">
          <div className="row align-items-stretch justify-content-center">
            {/* --- Event/Volunteer Info --- */}
            <div className="col-md-4 mb-4 animate-fadeInUp">
              <div className="p-4 bg-white shadow rounded h-100">
                <h5 className="fw-bold mb-3 text-center">{event.title}</h5>

                {isVolunteer && (
                  <p className="text-muted mb-3">
                    <i className="fa-solid fa-building" style={{ color: "#000b58" }}></i>{" "}
                    {event.org}
                  </p>
                )}

                <p>
                  <i className="fa-regular fa-calendar-days" style={{ color: "#000b58" }}></i>{" "}
                  {displayDate}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot" style={{ color: "#000b58" }}></i>{" "}
                  {displayLocation}
                </p>

                {/* ✅ عرض الـ tags للـ volunteers */}
                {isVolunteer && (
                  <div className="d-flex flex-wrap mb-3">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge rounded-pill text-bg-secondary me-1 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button 
                  className="btn btn-primary w-100" 
                  onClick={isVolunteer ? handleApply : handleRegister}
                >
                  {isVolunteer ? "Apply Now" : "Register Now"}
                </button>
              </div>
            </div>

            {/* --- Countdown Timer --- */}
            <div className="col-md-6 mb-4">
              <div className="p-4 count-s shadow rounded h-100 text-center">
                <h5>
                  {status === "finished" 
                    ? (isVolunteer ? "Opportunity Closed" : "Event Finished")
                    : status === "ongoing"
                    ? "Ongoing Opportunity"
                    : (isVolunteer ? "Opportunity Starts In:" : "Event Starts In:")}
                </h5>

                {status === "upcoming" && (
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
                )}

                {status === "finished" && (
                  <p className="text-danger mt-3 fw-bold">
                    {isVolunteer ? "This opportunity has closed 🎉" : "This event has finished 🎉"}
                  </p>
                )}

                {status === "ongoing" && (
                  <p className="text-info mt-3 fw-bold">
                    This is an ongoing opportunity - Apply anytime! 🌟
                  </p>
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