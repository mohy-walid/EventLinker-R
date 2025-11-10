import "../css/Events.css"
import CardsSection from "../Layouts/CardsLayout";
import FiltrationSection from "../Layouts/FiltrationLayout";
import HeaderSection from "../Layouts/HeaderLayout";

const EventsPage = () => {
  return (
    <div className="container">
      <HeaderSection/>
      <FiltrationSection/>
      <CardsSection/>
    </div>
  );
};

export default EventsPage;
