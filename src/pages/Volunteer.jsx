import "../css/Volunteer.css";
import CardsSection from "../Layouts/VolunteerCardsLayout";
import FilterSection from "../Layouts/VolunteerFiltrationLayout";
import HeaderSection from "../Layouts/VolunteerHeaderLayout";

const VolunteerPage = () => {
  return (
    <div className="container">
      <HeaderSection/>
      <FilterSection/>
      <CardsSection/>
    </div>
  );
};

export default VolunteerPage;