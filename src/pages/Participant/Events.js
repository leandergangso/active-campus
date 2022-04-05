import { useAppState } from "contexts/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Actions/Button";
import EventList from "./components/EventList";

const Events = () => {
  const { state } = useAppState();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // state.events = [];
  // state.user.events = ['1', '11', '3', '2', '31'];

  useEffect(() => {
    if (state.events.length > 0) {
      const now = + new Date() / 1000;
      const filteredEvents = state.events.filter(event => {
        if (state.user.events.includes(event.id)) {
          return now < event.date.to.seconds;
        }
      });
      setEvents(filteredEvents);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-between items-center mb-5">
        <h1 className="font-bold text-2xl">Påmeldt</h1>

        <div className="flex gap-5 w-full sm:w-40">
          <Button onClick={() => navigate('/events/history')} styles={'secondary'}>Historikk</Button>
        </div>
      </div>

      <EventList events={events} />
    </div>
  );
};

export default Events;