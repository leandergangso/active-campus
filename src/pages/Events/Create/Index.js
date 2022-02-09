import { useState } from "react";

import Info from "./Info";
import Settings from "./Settings";
import Forms from "./Forms";
import Stye from "./Style";

const Index = () => {
  const [curStep, setCurStep] = useState(2)
  const [data, setData] = useState({
    info: {
      name: '',
      organizer: '',
      address: '',
      tags: ['ingen', 'one', 'two'], // ! get from DB, and create method to add new once
      time: {
        start: '',
        end: '',
      },
      date: '',
      description: '',
    },
    settings: {
      date: {
        open: '',
        close: '',
      },
      time: {
        open: '',
        close: '',
      },
      maxParticipants: null,
      isWaitingList: false,
      isReminder: true,
      isSignoff: true,
      isSignoffReminder: false,
      signoffReminder: {
        date: '',
        time: '',
      },
      isConfirmationMail: true,
      isMailTicked: true,
      mailMessage: 'Hei %bruker%.\nDu er påmeldt %event%.\n\nSe info om arrangement her: %link%.',
    },
    forms: {

    },
    style: {

    },
  })

  const prevStep = () => {
    setCurStep((curStep) => curStep - 1)
  }

  const nextStep = () => {
    setCurStep((curStep) => curStep + 1)
  }

  const updateData = (type, newData) => {
    setData(data => {
      return { ...data, [type]: newData }
    })
  }

  switch (curStep) {
    case 1:
      return (
        <Info
          nextStep={nextStep}
          updateData={updateData}
          data={data.info}
        />
      )
    case 2:
      return (
        <Settings
          prevStep={prevStep}
          nextStep={nextStep}
          updateData={updateData}
          data={data.settings}
        />
      )
    case 3:
      return (
        <Forms
          prevStep={prevStep}
          nextStep={nextStep}
          updateData={updateData}
          data={data.forms}
        />
      )
    case 4:
      return (
        <Stye
          prevStep={prevStep}
          updateData={updateData}
          data={data.style}
        />
      )
    default:
    // do nothing
  }
};

export default Index;
