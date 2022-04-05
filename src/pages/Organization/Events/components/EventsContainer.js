import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "contexts/AppContext";
import EventCard from "components/EventCard";

const EventsContainer = ({ events }) => {
  const navigate = useNavigate();
  const { state } = useAppState();

  if (state.organizations.length === 0) {
    return (
      <div>
        <p className="text-xl text-placeholder">Ingen arrangementer tilgjengelig.</p>
        <p className="text-xl text-placeholder">
          Bli invitert eller opprett en organisasjon <Link to='/organizations/create' className='text-primary'>her</Link>.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div>
        <p className="text-xl text-placeholder">Finnes ingen arrangementer for gjeldene organisasjon.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5">
      {events.map(event => (
        <EventCard key={event.id} event={event} onClick={() => navigate(event.id)} />
      ))}
    </div>
  );
};

export default EventsContainer;