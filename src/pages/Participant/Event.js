import { MdToday, MdAccessTime, MdLocationOn, MdSupervisorAccount } from "react-icons/md";
import { eventSignoff, eventSignup, getEvent, getOrganization } from "helpers/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Actions/Button";
import ShowQR from "./components/ShowQR";
import { useAppState } from "contexts/AppContext";

const Event = () => {
  const navigate = useNavigate();
  const { state } = useAppState();
  const { orgID, eventID } = useParams();
  const [event, setEvent] = useState();
  const urlID = orgID + '/' + eventID;
  const qrCode = urlID + '/' + state.user.id;

  const signon = () => {
    if (event.forms.length > 0) {
      navigate('form');
    }
    const code = event.is_ticket ? qrCode : '';
    eventSignup(state.user.id, orgID, eventID, code);
  };

  const signoff = () => {
    eventSignoff(state.user.id, orgID, eventID);
  };

  useEffect(async () => {
    const eventDoc = await getEvent(orgID, eventID);
    if (eventDoc.exists()) {
      const org = await getOrganization(orgID);
      let event = eventDoc.data();

      const fromDateObj = new Date(event.date.from.seconds * 1000);
      const toDateObj = new Date(event.date.to.seconds * 1000);
      const signupOpenDateObj = new Date(event.signup.open.seconds * 1000);
      const signupCloseDateObj = new Date(event.signup.close.seconds * 1000);
      event.signup.open = `${('0' + signupOpenDateObj.getDate()).slice(-2)}.${('0' + (signupOpenDateObj.getMonth() + 1)).slice(-2)}.${signupOpenDateObj.getFullYear()}`;
      event.signup.close = `${('0' + signupCloseDateObj.getDate()).slice(-2)}.${('0' + (signupCloseDateObj.getMonth() + 1)).slice(-2)}.${signupCloseDateObj.getFullYear()}`;
      event.curDate = `${('0' + fromDateObj.getDate()).slice(-2)}.${('0' + (fromDateObj.getMonth() + 1)).slice(-2)}.${fromDateObj.getFullYear()}`;
      event.date.from = `${('0' + fromDateObj.getHours()).slice(-2)}:${('0' + fromDateObj.getMinutes()).slice(-2)}`;
      event.date.to = `${('0' + toDateObj.getHours()).slice(-2)}:${('0' + toDateObj.getMinutes()).slice(-2)}`;

      setEvent({ organizer: org.data().short_name, ...event });
    }
  }, []);

  if (!event) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5">Ugylding arrangement</h1>
        <p className="text-xl">Fant ikke arrangement med id: {eventID}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:max-w-sm">
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-bold text-2xl">{event.name}</h1>
        <h2 className="font-bold text-md text-placeholder">{event.organizer}</h2>
      </div>

      <img src={event.image} alt="arrangement-bilde" className='border-2 border-dark rounded-md' />

      <div className="flex sm:w-full gap-5">
        {/* <Button onClick={() => navigate('discussion')} styles={'secondary'}>Diskusjon</Button> */}
        {state.user.events.includes(urlID)
          ? <Button styles={'danger'} onClick={signoff}>Meld av</Button>
          : <Button onClick={signon}>Meld på</Button>
        }
      </div>

      <div className="flex flex-col gap-5 border border-border bg-light rounded-md p-4 -mx-4 sm:mx-0">
        <div className="flex gap-2 sm:gap-5">
          <div className="flex items-center gap-2">
            <MdToday size={24} className='fill-primary' />
            <span>{event.curDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime size={24} className='fill-primary' />
            <div className="flex flex-col">
              <span>{event.date.from} - {event.date.to}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <MdLocationOn size={24} className='fill-primary' />
          <span>{event.address}</span>
        </div>

        <div className="flex gap-2">
          <MdSupervisorAccount size={24} className='fill-primary' />
          <span>{event.signup_count} / {event.max_participants} påmeldte</span>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Informasjon</h3>
          <p>{event.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Påmelding</h3>
          <p>Åpner: <span className="font-bold">{event.signup.open}</span></p>
          <p>Stenger: <span className="font-bold">{event.signup.close}</span></p>
        </div>

        {/* <div>
          <h3 className="font-bold text-lg mb-1">Avmelding</h3>
          <p>Siste frist: <span className="font-bold">18.02.2023</span></p>
          <p>Avmelding er ikke tillatt for dette arrangementet.</p>
        </div> */}
      </div>

      {event.is_ticket && state.user.events.includes(urlID) && <ShowQR qrValue={qrCode} />}
    </div>
  );
};

export default Event;