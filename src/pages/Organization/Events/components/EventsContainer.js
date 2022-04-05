import { Link } from "react-router-dom";
import { useAppState } from "contexts/AppContext";
import EventCard from "components/EventCard";

const EventsContainer = ({ events }) => {
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
        <p className="text-xl text-placeholder">
          Ingen aktive eller arkiverte arrangementer for organisasjonen: <span className="font-bold">{state.currentOrganization.short_name}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsContainer;