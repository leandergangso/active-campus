import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Info from "./Info";
import Settings from "./Settings";
import Form from "./Form";

const Index = () => {
  const navigate = useNavigate();
  const [curStep, setCurStep] = useState(3);
  const [data, setData] = useState({
    // info
    name: '',
    description: '',
    address: '',
    startDate: '',
    startTime: '00:00',
    endTime: '00:00',
    // settings
    signupOpenDate: '',
    signupOpenTime: '00:00',
    signupCloseDate: '',
    signupCloseTime: '00:00',
    maxParticipants: '100',
    isWaitingList: false,
    isTicket: false,
    mailBody: 'Hei %navn%.\n\nDu er nå påmeldt %arrangement%, se info i linken under.\n\n%link%',
    // form
    forms: [
      {
        id: 0,
        question: '',
        type: 'Tekst',
        options: [{
          id: 0,
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

  const submitForm = () => {
    console.log('sending form data');
    // ! validate formData
    navigate('/events');
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
          updateData={updateData}
          data={data}
        />
      );
    default:
    // do nothing
  }
};

export default Index;
