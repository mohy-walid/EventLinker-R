import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import event1 from "../assets/img/events_card_1.PNG"
import event2 from "../assets/img/events_card_2.PNG"
import event3 from "../assets/img/events_card_3.PNG"
import event4 from "../assets/img/events_card_4.PNG"
import event5 from "../assets/img/events_card_5.PNG"
import event6 from "../assets/img/events_card_6.PNG"
import event7 from "../assets/img/events_card_7.PNG"
import event8 from "../assets/img/events_card_8.PNG"
import event9 from "../assets/img/events_card_9.PNG"

const eventsData = [
  {
    id: 1,
    title: "Global Tech Summit 2024",
    text: "Innovating the Future of Technology",
    tags: ["Conference", "Oct 26, 9:00 AM", "Virtual - Online"],
    description:
      "Join leading experts and innovators for discussions on AI, blockchain, and sustainable tech.",
    img: event1,
    date: "October 26, 2024",
    place: "Virtual - Online",
  },
  {
    id: 2,
    title: "Annual Food Festival",
    text: "Journey Through Global Flavors",
    tags: ["Festival", "Nov 10, 11:00 AM", "City Park Arena"],
    description:
      "Indulge in a delightful array of international cuisines, local delicacies, and gourmet treats.",
    img: event2,
    date: "November 10, 2024",
    place: "City Park Arena",
  },
  {
    id: 3,
    title: "Digital Marketing",
    text: "Strategies for new World",
    tags: ["Workshop", "Dec 05, 10:00 AM", "Convention Center"],
    description:
      "Learn the latest trends in SEO, social media, content creation, and analytics. Gain actionable insights",
    img: event3,
    date: "December 05, 2024",
    place: "Convention Center",
  },
  {
    id: 4,
    title: "Wellness Retreat",
    text: "Rejuvenate Your Mind & Soul",
    tags: [" Retreat", " Jan 15, 8:00 AM", " Mountain Lodge Resort"],
    description:
      "Escape the daily grind and immerse yourself in a serene environment focused on personal well-being",
    img: event4,
    date: "January 15, 2025",
    place: "Mountain Lodge Resort",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    text: "Showcasing Tomorrow's Innovations",
    tags: ["Competition", " Feb 20, 2:00 PM", " Innovation Hub"],
    description:
      "Witness groundbreaking startups present their ideas to a panel of investors and entrepreneurs.",
    img: event5,
    date: "February 20, 2025",
    place: "Innovation Hub",
  },
  {
    id: 6,
    title: "Art & Culture Expo",
    text: "Creativity and Heritage",
    tags: [" Exhibition", "Mar 08, 10:00 AM", " Grand Art Gallery"],
    description:
      "Explore diverse art forms, from contemporary paintings to traditional crafts. Enjoy live",
    img: event6,
    date: "March 08, 2025",
    place: "Grand Art Gallery",
  },
  {
    id: 7,
    title: "E-Sports Championship",
    text: "The Ultimate Gaming Showdow",
    tags: [" Tournament", "  Apr 12, 6:00 PM", " Cyberdome Arena"],
    description:
      "Experience the thrill of competitive gaming as top teams battle it out for glory and prizes. Witness",
    img: event7,
    date: "April 12, 2025",
    place: "Cyberdome Arena",
  },
  {
    id: 8,
    title: "Sustainable Living Fair",
    text: "Embrace a Greener Future",
    tags: [" Fair", " May 25, 10:00 AM", " Community Garden"],
    description:
      "Discover eco-friendly products, sustainable practices, and innovative solutions for conscious",
    img: event8,
    date: "May 25, 2025",
    place: "Community Garden",
  },
  {
    id: 9,
    title: "Annual Tech Summit",
    text: "The future of technology.",
    tags: [" Conference", " October 26,2024", "Convention Center"],
    description:
      "Connect with industry leaders, attend insightful keynotes, and explore cutting-edge solutions in AI, cybersecurity, and cloud computing.",
    img: event9,
    date: "October 26, 2024",
    place: "Convention Center",
  },
];

function CardsSection() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState([]);

  // دالة للحصول على مفتاح خاص بالمستخدم
  const getUserKey = (baseKey) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return null;
    return `${baseKey}_${user.id}`;
  };

  // تحميل الأحداث المحفوظة للمستخدم الحالي
  useEffect(() => {
    const idsKey = getUserKey("savedEventIds");
    if (idsKey) {
      const ids = JSON.parse(localStorage.getItem(idsKey)) || [];
      setSavedIds(ids);
    }
  }, []);

  const handleSave = (event) => {
    // التحقق من تسجيل الدخول
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login to save events!");
      navigate("/");
      return;
    }

    // الحصول على المفاتيح الخاصة بالمستخدم
    const eventsKey = getUserKey("savedEvents");
    const idsKey = getUserKey("savedEventIds");

    const savedEvents = JSON.parse(localStorage.getItem(eventsKey)) || [];
    const exists = savedEvents.find((e) => e.id === event.id);

    if (exists) {
      alert("You already saved this event!");
      return;
    }

    // حفظ الحدث
    const updated = [...savedEvents, event];
    localStorage.setItem(eventsKey, JSON.stringify(updated));

    // حفظ الـ ID
    const newIds = [...savedIds, event.id];
    localStorage.setItem(idsKey, JSON.stringify(newIds));
    setSavedIds(newIds);

    alert("Event saved successfully!");
  };

  const visitDetails = (event) => {
    navigate("/details", { state: event });
  };

  return (
    <>
      <div className="row g-3 mt-4">
        {eventsData.map((event) => (
          <div key={event.id} className="col-12 col-sm-6 col-lg-3">
            <div
              className="card event-card h-100"
              style={{ borderRadius: "20px" }}
            >
              <img src={event.img} alt={event.title} />

              <div className="card-body position-relative d-flex flex-column">
                {/* عنوان الإيفينت */}
                <h5 className="fw-bold">{event.title}</h5>

                {/* أيقونة الحفظ */}
                <span
                  className="position-absolute top-0 end-0 p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSave(event)}
                >
                  <i
                    className={
                      savedIds.includes(event.id)
                        ? "fa-solid fa-bookmark fa-xl"
                        : "fa-regular fa-bookmark fa-xl"
                    }
                    style={{ color: "#3D38C4" }}
                  ></i>
                </span>

                <p>{event.text}</p>
                <div className="d-flex flex-wrap mb-2">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="badge rounded-pill text-bg-secondary me-1 mb-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="m-2">{event.description}</p>

                <div className="d-flex justify-content-end">
                  <button
                    className="mt-auto btn btn-primary"
                    onClick={() => visitDetails(event)}
                  >
                    Visit Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardsSection;