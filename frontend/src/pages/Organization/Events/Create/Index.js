import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Info from "./Info";
import Settings from "./Settings";
import Form from "./Form";
import { createEvent, createTimestamp } from "../../../../helpers/firestore";
import { useAppState } from "../../../../contexts/AppContext";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useAppState();
  const [curStep, setCurStep] = useState(1);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    // info
    name: '',
    description: '',
    address: '',
    date: '',
    start_time: '01:00',
    end_time: '00:00',
    // settings
    signup_open_date: '',
    signup_open_time: '01:00',
    signup_close_date: '',
    signup_close_time: '00:00',
    max_participants: '100',
    is_waiting_list: false,
    is_ticket: false,
    email_body: 'Hei %navn%.\n\nDu er nå påmeldt %arrangement%, se info i linken under.\n\n%link%',
    // form
    forms: [
      {
        id: + new Date(),
        question: '',
        type: 'Tekst',
        options: [{
          id: + new Date(),
          name: '',
          checked: false,
        }],
        required: false,
      }
    ],
  });

  const prevStep = () => {
    setCurStep(curStep => curStep - 1);
  };

  const nextStep = () => {
    setCurStep(curStep => curStep + 1);
  };

  const updateData = (type, newData) => {
    setData(data => {
      return { ...data, [type]: newData };
    });
  };

  const curryUpdate = (type) => {
    return (e) => updateData(type, e.target.value);
  };

  const submitForm = async () => {
    setError('');

    const date_from = createTimestamp(new Date(`${data.date} ${data.start_time}`));
    const date_to = createTimestamp(new Date(`${data.date} ${data.end_time}`));
    const signup_open = createTimestamp(new Date(`${data.signup_open_date} ${data.signup_open_time}`));
    const signup_close = createTimestamp(new Date(`${data.signup_close_date} ${data.signup_close_time}`));

    // ! validate data

    try {
      await createEvent(
        state.currentOrganization.org_number, state.user.id, data.name, data.description, data.address,
        data.email_body, date_from, date_to, signup_open, signup_close,
        data.max_participants, data.is_waiting_list, data.is_ticket, data.forms
      );
      navigate('/events');
    }
    catch (error) {
      console.error(error);
      setError('Ops, mangel eller feil i en eller flere verdier...');
    }

  };

  switch (curStep) {
    case 1:
      return (
        <Info
          nextStep={nextStep}
          curryUpdate={curryUpdate}
          data={data}
        />
      );
    case 2:
      return (
        <Settings
          prevStep={prevStep}
          nextStep={nextStep}
          updateData={updateData}
          curryUpdate={curryUpdate}
          data={data}
        />
      );
    case 3:
      return (
        <Form
          prevStep={prevStep}
          submit={submitForm}
          error={error}
          updateData={updateData}
          data={data}
        />
      );
    default:
    // do nothing
  }
};

export default Index;
