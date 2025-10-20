const eventsData = [
  {
    title: "Global Tech Summit 2024",
    text: "Innovating the Future of Technology",
    tags: ["Conference", "Oct 26, 9:00 AM", "Virtual - Online"],
    description:
      "Join leading experts and innovators for discussions on AI, blockchain, and sustainable tech. Network with",
    img: "/Event/img/events_card_1.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Annual Food Festival",
    text: "Journey Through Global Flavors",
    tags: ["Festival", "Nov 10, 11:00 AM", "City Park Arena"],
    description:
      "Indulge in a delightful array of international cuisines, local delicacies, and gourmet treats.",
    img: "/Event/img/events_card_2.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Digital Marketing",
    text: "Strategies for new World",
    tags: ["Workshop", "Dec 05, 10:00 AM", "Convention Center"],
    description:
      "Learn the latest trends in SEO, social media, content creation, and analytics. Gain actionable insights",
    img: "/Event/img/events_card_3.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Wellness Retreat",
    text: "Rejuvenate Your Mind & Soul",
    tags: [" Retreat", " Jan 15, 8:00 AM", " Mountain Lodge Resort"],
    description:
      "Escape the daily grind and immerse yourself in a serene environment focused on personal well-being",
    img: "/Event/img/events_card_4.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Startup Pitch Competition",
    text: "Showcasing Tomorrow's Innovations",
    tags: ["Competition", " Feb 20, 2:00 PM", " Innovation Hub"],
    description:
      "Witness groundbreaking startups present their ideas to a panel of investors and entrepreneurs.",
    img: "/Event/img/events_card_5.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Art & Culture Expo",
    text: "Creativity and Heritage",
    tags: [" Exhibition", "Mar 08, 10:00 AM", " Grand Art Gallery"],
    description:
      "Explore diverse art forms, from contemporary paintings to traditional crafts. Enjoy live",
    img: "/Event/img/events_card_6.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "E-Sports Championship",
    text: "The Ultimate Gaming Showdow",
    tags: [" Tournament", "  Apr 12, 6:00 PM", " Cyberdome Arena"],
    description:
      "Experience the thrill of competitive gaming as top teams battle it out for glory and prizes. Witness",
    img: "/Event/img/events_card_7.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Sustainable Living Fair",
    text: "Embrace a Greener Future",
    tags: [" Fair", " May 25, 10:00 AM", " Community Garden"],
    description:
      "Discover eco-friendly products, sustainable practices, and innovative solutions for conscious",
    img: "/Event/img/events_card_8.PNG",
    detailsLink: "/Event/html/details.html",
  },
  {
    title: "Annual Tech Summit",
    text: "The future of technology.",
    tags: [" Conference", " October 26,2024", "Convention Center"],
    description:
      "Connect with industry leaders, attend insightful keynotes, and explore cutting-edge solutions in AI, cybersecurity, and cloud computing.",
    img: "/Event/img/events_card_9.PNG",
    detailsLink: "/Event/html/details.html",
  },
];

function CardsSection() {
  return (
    <>
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
                <p className="m-2">{event.description}</p>
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
    </>
  );
}

export default CardsSection;
