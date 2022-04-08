import EventCard from "components/EventCard";
import { useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-5">
      {events.length !== 0
        ? events.map(event => (
          <EventCard key={event.id} event={event} onClick={() => navigate(`${event.organizerID}/${event.id}`)} />
        ))
        : <p className="text-xl">Fant ingen relevante arrangementer.</p>
      }
    </div>
  );
};

export default EventList;