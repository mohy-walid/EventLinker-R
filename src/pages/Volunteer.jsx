import "../css/Volunteer.css";
import CardsSection from "../Layouts/CardsLayout";
import FilterSection from "../Layouts/FiltrationLayout";
import HeaderSection from "../Layouts/HeaderLayout";

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
