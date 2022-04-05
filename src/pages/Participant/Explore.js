import { useAppState } from "contexts/AppContext";
import { getAllEvents } from "helpers/firestore";
import { useEffect, useState } from "react";
import EventList from "./components/EventList";

const History = () => {
  const { state } = useAppState();
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   if (state.events.length > 0) {
  //     const now = + new Date() / 1000;
  //     const filteredEvents = state.events.filter(event => {
  //       if (!state.user.events?.includes(event.id)) {
  //         return now > event.date.to.seconds;
  //       }
  //       return false;
  //     });
  //     setEvents(filteredEvents);
  //   }
  // }, [state.events, state.user.events]);

  useEffect(async () => {
    let allEvents = [];
    for (let i = 0; i < state.organizations.length; i++) {
      const org = state.organizations[i];
      const docs = await getAllEvents(org.id);
      docs.forEach(doc => {
        allEvents.push({ id: doc.id, organizer: org.short_name, ...doc.data() });
      });
    }
    // ! sort out events that the user is already signed-up on
    // ! sort by first upcomming event
    setEvents(allEvents);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-between items-center mb-5">
        <h1 className="font-bold text-2xl">Utforsk</h1>
      </div>

      <EventList events={events} />
    </div>
  );
};

export default History;