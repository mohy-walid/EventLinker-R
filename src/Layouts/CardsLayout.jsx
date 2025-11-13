import { useState } from "react";

const eventsData = [
  {
    id: 1,
    title: "Global Tech Summit 2024",
    text: "Innovating the Future of Technology",
    tags: ["Conference", "Oct 26, 9:00 AM", "Virtual - Online"],
    description:
      "Join leading experts and innovators for discussions on AI, blockchain, and sustainable tech.",
    img: "public/img/events_card_1.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 2,
    title: "Annual Food Festival",
    text: "Journey Through Global Flavors",
    tags: ["Festival", "Nov 10, 11:00 AM", "City Park Arena"],
    description:
      "Indulge in a delightful array of international cuisines, local delicacies, and gourmet treats.",
    img: "public/img/events_card_2.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 3,
    title: "Digital Marketing",
    text: "Strategies for new World",
    tags: ["Workshop", "Dec 05, 10:00 AM", "Convention Center"],
    description:
      "Learn the latest trends in SEO, social media, content creation, and analytics. Gain actionable insights",
    img: "public/img/events_card_3.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 4,
    title: "Wellness Retreat",
    text: "Rejuvenate Your Mind & Soul",
    tags: [" Retreat", " Jan 15, 8:00 AM", " Mountain Lodge Resort"],
    description:
      "Escape the daily grind and immerse yourself in a serene environment focused on personal well-being",
    img: "public/img/events_card_4.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    text: "Showcasing Tomorrow's Innovations",
    tags: ["Competition", " Feb 20, 2:00 PM", " Innovation Hub"],
    description:
      "Witness groundbreaking startups present their ideas to a panel of investors and entrepreneurs.",
    img: "public/img/events_card_5.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 6,
    title: "Art & Culture Expo",
    text: "Creativity and Heritage",
    tags: [" Exhibition", "Mar 08, 10:00 AM", " Grand Art Gallery"],
    description:
      "Explore diverse art forms, from contemporary paintings to traditional crafts. Enjoy live",
    img: "public/img/events_card_6.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 7,
    title: "E-Sports Championship",
    text: "The Ultimate Gaming Showdow",
    tags: [" Tournament", "  Apr 12, 6:00 PM", " Cyberdome Arena"],
    description:
      "Experience the thrill of competitive gaming as top teams battle it out for glory and prizes. Witness",
    img: "public/img/events_card_7.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 8,
    title: "Sustainable Living Fair",
    text: "Embrace a Greener Future",
    tags: [" Fair", " May 25, 10:00 AM", " Community Garden"],
    description:
      "Discover eco-friendly products, sustainable practices, and innovative solutions for conscious",
    img: "public/img/events_card_8.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    id: 9,
    title: "Annual Tech Summit",
    text: "The future of technology.",
    tags: [" Conference", " October 26,2024", "Convention Center"],
    description:
      "Connect with industry leaders, attend insightful keynotes, and explore cutting-edge solutions in AI, cybersecurity, and cloud computing.",
    img: "public/img/events_card_9.PNG",
    detailsLink: "/Event/html/details.html",
  },
];

function CardsSection() {
  const [savedIds, setSavedIds] = useState(
    JSON.parse(localStorage.getItem("savedEventIds")) || []
  );

  const handleSave = (event) => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
    const exists = savedEvents.find((e) => e.title === event.title);

    if (exists) {
      alert("You already saved this event!");
      return;
    }

    const updated = [...savedEvents, event];
    localStorage.setItem("savedEvents", JSON.stringify(updated));

    const newIds = [...savedIds, event.id];
    localStorage.setItem("savedEventIds", JSON.stringify(newIds));
    setSavedIds(newIds);

    alert("Event saved successfully!");
  };

  return (
    <>
      <div className="row g-3 mt-4">
        {eventsData.map((event) => (
          <div key={event.id} className="col-12 col-sm-6 col-lg-3">
            <div
              className="card event-card"
              style={{ borderRadius: "20px" }}
            >
              <img
                src={event.img}
                alt={event.title}
              />

              <div className="card-body position-relative">
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

                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge rounded-pill text-bg-secondary me-1"
                  >
                    {tag}
                  </span>
                ))}

                <p className="m-2">{event.description}</p>

                <div className="d-flex justify-content-end align-items-end mt-2">
                  <a href={event.detailsLink} className="btn btn-primary">
                    Visit Now
                  </a>
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
