import "../css/Events.css"
import CardsSection from "../Layouts/EventCardsLayout";
import FiltrationSection from "../Layouts/EventFiltrationLayout";
import HeaderSection from "../Layouts/EventHeaderLayout";

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
