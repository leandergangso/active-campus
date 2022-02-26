import { Link } from "react-router-dom";
import { useAppState } from "../../../contexts/AppContext";
import EventCard from "./EventCard";

const EventsContainer = ({ events }) => {
  const { state } = useAppState();

  if (state.organizations.length === 0) {
    return (
      <div>
        <p className="text-xl text-placeholder">Ingen arrangementer tilgjengelig.</p>
        <p className="text-xl text-placeholder">Bli invitert eller opprett en organisasjon <Link to='/organizations/create' className='text-primary'>her</Link>.</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div>
        <p className="text-xl text-placeholder">Ingen aktive eller arkiverte arrangementer for {state.currentOrganization.name}.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap gap-5 2xl:gap-x-10">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsContainer;