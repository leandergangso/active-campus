import EventCard from "./EventCard";

const EventsContainer = ({ events }) => {

  if (events.length === 0) {
    return (
      <div>
        no event...
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