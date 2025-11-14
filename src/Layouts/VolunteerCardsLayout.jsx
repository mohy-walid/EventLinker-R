import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const volunteerData = [
  {
    id: 1,
    title: "Park Cleanup Drive",
    org: "Green Earth Foundation",
    tags: ["Environment", "October 26, 2024", "Central Park"],
    img: "public/img/1.png",
    description:
      "Join us for a community park cleanup to restore the beauty of our local green spaces. Gloves and bags will be provided. All ages welcome!",
  },
  {
    id: 2,
    title: "Youth Mentoring Program",
    org: "Future Leaders Hub",
    tags: ["Education", "November 10, 2024", "Community Center"],
    img: "public/img/2.png",
    description:
      "Help guide young minds through our mentorship program. Share your knowledge and make a positive impact on a child's future.",
  },
  {
    id: 3,
    title: "Homeless Shelter Support",
    org: "City Outreach Program",
    tags: ["Community", "December 01, 2024", "Downtown Shelter"],
    img: "public/img/3.png",
    description:
      "Assist with meal preparation and distribution at the city's largest homeless shelter. Your help makes a difference.",
  },
  {
    id: 4,
    title: "Elderly Companion Service",
    org: "Golden Years Alliance",
    tags: ["Healthcare", "Ongoing", "Various Homes"],
    img: "public/img/4.png",
    description:
      "Provide companionship and support to seniors in their homes, offering a friendly face and a helping hand with daily tasks.",
  },
  {
    id: 5,
    title: "Animal Shelter Assistant",
    org: "Paws & Claws Rescue",
    tags: ["Animals", "November 15, 2024", "Local Animal Shelter"],
    img: "public/img/5.png",
    description:
      "Spend time with our furry friends! Help with feeding, cleaning, and providing love to animals awaiting adoption.",
  },
  {
    id: 6,
    title: "Coastal Conservation Project",
    org: "Ocean Guardians",
    tags: ["Environmental", "January 20, 2025", "North Beach"],
    img: "public/img/6.png",
    description:
      "Join us in protecting our marine ecosystems. Participate in our monthly beach cleanup and contribute to a healthier ocean.",
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

  // تحميل الفرص المحفوظة للمستخدم الحالي
  useEffect(() => {
    const idsKey = getUserKey("savedVolunteerIds");
    if (idsKey) {
      const ids = JSON.parse(localStorage.getItem(idsKey)) || [];
      setSavedIds(ids);
    }
  }, []);

  const handleSave = (volunteer) => {
    // التحقق من تسجيل الدخول
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login to save volunteer opportunities!");
      navigate("/");
      return;
    }

    // الحصول على المفاتيح الخاصة بالمستخدم
    const volunteersKey = getUserKey("savedVolunteers");
    const idsKey = getUserKey("savedVolunteerIds");

    const savedVolunteers = JSON.parse(localStorage.getItem(volunteersKey)) || [];
    const exists = savedVolunteers.find((v) => v.id === volunteer.id);

    if (exists) {
      alert("You already saved this volunteer opportunity!");
      return;
    }

    // حفظ الفرصة
    const updated = [...savedVolunteers, volunteer];
    localStorage.setItem(volunteersKey, JSON.stringify(updated));

    // حفظ الـ ID
    const newIds = [...savedIds, volunteer.id];
    localStorage.setItem(idsKey, JSON.stringify(newIds));
    setSavedIds(newIds);

    alert("Volunteer opportunity saved successfully!");
  };

  const visitDetails = (volunteer) => {
    navigate("/details", { state: volunteer });
  };

  return (
    <>
      <div className="row g-3 mt-4">
        {volunteerData.map((volunteer) => (
          <div key={volunteer.id} className="col-12 col-sm-6 col-lg-3">
            <div
              className="card volunteer-card h-100"
              style={{ borderRadius: "20px" }}
            >
              <img src={volunteer.img} alt={volunteer.title} />
              
              <div className="card-body position-relative d-flex flex-column">
                <h5 className="fw-bold">{volunteer.title}</h5>
                
                {/* Save Icon */}
                <span
                  className="position-absolute top-0 end-0 p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSave(volunteer)}
                >
                  <i
                    className={
                      savedIds.includes(volunteer.id)
                        ? "fa-solid fa-bookmark fa-xl"
                        : "fa-regular fa-bookmark fa-xl"
                    }
                    style={{ color: "#3D38C4" }}
                  ></i>
                </span>
                
                <p className="card-text">{volunteer.org}</p>
                
                <div className="d-flex flex-wrap mb-2">
                  {volunteer.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="badge rounded-pill text-bg-secondary me-1 mb-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="m-2">{volunteer.description}</p>
                
                <div className="d-flex justify-content-end">
                  <button
                    className="mt-auto btn btn-primary"
                    onClick={() => visitDetails(volunteer)}
                  >
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