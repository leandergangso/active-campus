import Button from "components/Actions/Button";
import Checkbox from "components/Actions/Checkbox";
import Input from "components/Actions/Input";
import { useAppState } from "contexts/AppContext";
import { getEvent, getOrganization } from "helpers/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const { state } = useAppState();
  const { orgID, eventID } = useParams();
  const [event, setEvent] = useState();
  const urlID = orgID + '/' + eventID;

  const onSubmit = (e) => {
    e.preventDefault();

    // ! signup user

    navigate('/events/' + urlID);
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

      console.log(event);
      setEvent({ organizer: org.data().short_name, ...event });
    }
  }, []);

  if (!event) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5">Ugylding arrangement</h1>
        <p className="text-xl">Fant ikke data for arrangement med id: {eventID}</p>
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

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {event.forms.map(form => (
          form.type === 'Tekst' && <TextForm key={form.id} form={form} />
          || form.type === 'Flervalg' && <MultiForm key={form.id} form={form} />
          || form.type === 'Enkelvalg' && <SingleForm key={form.id} form={form} />
        ))}
        <Button>Meld på</Button>
      </form>
    </div>
  );
};

const TextForm = ({ form }) => {
  return (
    <div className="border border-border rounded-md p-4">
      <Input label={form.question} required={form.required} />
    </div>
  );
};

const MultiForm = ({ form }) => {
  return (
    <div className="border border-border rounded-md p-4">
      <span>{form.question}</span>
      {form.options.map(option => (
        <div key={option.id}>
          <label className="cursor-pointer select-none">
            <input type="checkbox" defaultChecked={option.checked} name={option.name} className="mr-4" />
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const SingleForm = ({ form }) => {
  return (
    <div className="border border-border rounded-md p-4">
      <span>{form.question}</span>
      {form.options.map(option => (
        <div key={option.id}>
          <label className="cursor-pointer select-none">
            <input required={option.required} type="radio" name={form.question} className="mr-4" />
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default EventForm;