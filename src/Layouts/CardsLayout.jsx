const volunteerData = [
  {
    title: "Park Cleanup Drive",
    org: "Green Earth Foundation",
    tags: ["Environment", "October 26, 2024", "Central Park"],
    img: "public/img/1.png",
    description:
      "Join us for a community park cleanup to restore the beauty of our local green spaces. Gloves and bags will be provided. All ages welcome!",
  },
  {
    title: "Youth Mentoring Program",
    org: "Future Leaders Hub",
    tags: ["Education", "November 10, 2024", "Community Center"],
    img: "public/img/2.png",
    description:
      "Help guide young minds through our mentorship program. Share your knowledge and make a positive impact on a child's future.",
  },
  {
    title: "Homeless Shelter Support",
    org: "City Outreach Program",
    tags: ["Community", "December 01, 2024", "Downtown Shelter"],
    img: "public/img/3.png",
    description:
      "Assist with meal preparation and distribution at the city's largest homeless shelter. Your help makes a difference.",
  },
  {
    title: "Elderly Companion Service",
    org: "Golden Years Alliance",
    tags: ["Healthcare", "Ongoing", "Various Homes"],
    img: "public/img/4.png",
    description:
      "Provide companionship and support to seniors in their homes, offering a friendly face and a helping hand with daily tasks.",
  },
  {
    title: "Animal Shelter Assistant",
    org: "Paws & Claws Rescue",
    tags: ["Animals", "November 15, 2024", "Local Animal Shelter"],
    img: "public/img/5.png",
    description:
      "Spend time with our furry friends! Help with feeding, cleaning, and providing love to animals awaiting adoption.",
  },
  {
    title: "Coastal Conservation Project",
    org: "Ocean Guardians",
    tags: ["Environmental", "January 20, 2025", "North Beach"],
    img: "public/img/6.png",
    description:
      "Join us in protecting our marine ecosystems. Participate in our monthly beach cleanup and contribute to a healthier ocean.",
  },
];

function CardsSection() {
  return (
    <>
      <div className="row align-items-center justify-content-center m-2 p-2 g-5">
        {volunteerData.map((vol, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 w-100" style={{ borderRadius: "20px" }}>
              <img
                src={vol.img}
                className="card-img-top img-fluid"
                alt={vol.title}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold d-flex">{vol.title}</h5>
                <span className="d-flex justify-content-end p-2">
                  <i
                    className="fa-regular fa-bookmark fa-xl"
                    style={{ color: "#3D38C4" }}
                  ></i>
                </span>
                <p className="card-text">{vol.org}</p>
                {vol.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge rounded-pill text-bg-secondary me-1"
                  >
                    {tag}
                  </span>
                ))}
                <p className="m-2">{vol.description}</p>
                <div className="d-flex justify-content-end">
                  <button type="button" className="mt-auto btn btn-primary">
                    Apply Now
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
