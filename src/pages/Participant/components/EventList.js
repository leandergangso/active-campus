import EventCard from "components/EventCard";

const EventList = ({ events }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {events.length !== 0 ? (
        events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p className="text-xl">Du er ikke meldt på noen arrangementer.</p>
      )}
    </div>
  );
};

export default EventList;