import { MdToday, MdAccessTime, MdLocationOn, MdSupervisorAccount } from "react-icons/md";
import { useAppState } from "contexts/AppContext";
import { createTimestamp } from "helpers/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Actions/Button";
import ShowQR from "./components/ShowQR";

const Event = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAppState();
  const [event, setEvent] = useState(false);

  useEffect(() => {
    const event = state.events.find(event => {
      return event.id === id;
    });
    if (event) {
      setEvent(event);
    }
  }, [state.events]);

  if (!event) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5">Ugylding arrangement</h1>
        <p className="text-xl">Fant ikke arrangement med id: {id}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:max-w-sm">
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-bold text-2xl">{event?.name}</h1>
        <h2 className="font-bold text-md text-placeholder">{event?.organization}</h2>
      </div>

      <img src={event?.img} alt="arrangement-bilde" className='border-2 border-dark rounded-md' />

      <div className="flex sm:w-full gap-5">
        <Button onClick={() => navigate('discussion')} styles={'secondary'}>Diskusjon</Button>
        <Button onClick={() => console.log('firebase add user to event')}>Meld på</Button>
      </div>

      <div className="flex flex-col gap-5 border border-border bg-light rounded-md p-4 -mx-4 sm:mx-0">
        <div className="flex gap-2 sm:gap-5">
          <div className="flex items-center gap-2">
            <MdToday size={24} className='fill-primary' />
            <span>20.03.2023</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime size={24} className='fill-primary' />
            <div className="flex flex-col">
              <span>20:00 - 23:00</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <MdLocationOn size={24} className='fill-primary' />
          <span>Briedablikk 12, Sandefjord 3229</span>
        </div>

        <div className="flex gap-2">
          <MdSupervisorAccount size={24} className='fill-primary' />
          <span>30 / 55 påmeldte</span>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Informasjon</h3>
          <p>{event?.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Påmelding</h3>
          <p>Åpner: <span className="font-bold">20.02.2023</span></p>
          <p>Stenger: <span className="font-bold">13.03.2023</span></p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Avmelding</h3>
          <p>Siste frist: <span className="font-bold">18.02.2023</span></p>
          <p>Avmelding er ikke tillatt for dette arrangementet.</p>
        </div>
      </div>

      <ShowQR />
    </div>
  );
};

export default Event;