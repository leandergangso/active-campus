import Input from "../../../components/Actions/Input";
import Button from "../../../components/Actions/Button";
import Checkbox from "../../../components/Actions/Checkbox";
import { useState } from "react";

const Settings = ({ prevStep, nextStep, updateData, data }) => {
  const [isSignoff, setIsSignoff] = useState(false)
  const [isConfirmation, setIsConfirmation] = useState(true)

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Frister og varslinger</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-80 sm:mr-10">
            <div className="flex gap-5">
              <Input name='signon' type='date' label='Påmelding åpnes*' />
              <Input name='signon-time' type='time' value="00:00" label='tid' />
            </div>

            <div className="flex gap-5">
              <Input name='signoff' type='date' label='Påmelding stenges*' />
              <Input name='signoff-time' type='time' value="00:00" label='tid' />
            </div>

            <Input name='amount' type='number' value='1' label='Max deltagere*' />

            <Checkbox onChange={() => console.log('1')} name='waitinglist' checked label='Ta i bruk venteliste' />
            <Checkbox onChange={() => console.log('2')} name='reminder' checked label='Send påmindelse for arrangement start' />
            <Checkbox onChange={() => setIsSignoff(prev => !prev)} name='allow-signoff' label='Mulighet for avmelding' />

            {isSignoff &&
              <>
                <Checkbox onChange={() => console.log('4')} name='signoff-deadline' label='Send påmindelse for avmeldings frist' />
                <div className="flex gap-5">
                  <Input name='deadline' type='date' label='Avmeldings frist*' />
                  <Input name='deadline-time' type='time' value="00:00" label='tid' />
                </div>
              </>
            }
          </div>

          <div className="flex flex-col gap-2 w-80">
            <Checkbox onChange={() => setIsConfirmation(prev => !prev)} name='confirmation-mail' checked label='Send bekreftelse på e-post' />
            {isConfirmation && <Checkbox onChange={() => console.log('6')} name='ticket' label='Send billett ved påmelding' />}

            {isConfirmation &&
              <>
                <label htmlFor="mail">Mail</label>
                <textarea className="border border-border outline-none rounded-md p-2 resize-none focus:border-dark" id="mail" rows="10" defaultValue={data.mailMessage} />
              </>
            }


          </div>
        </div>

        <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap sm:w-80">
          <Button text='Neste' onClick={nextStep} />
          <Button text='Forrige' style='secondary' onClick={prevStep} />
        </div>
      </div>
    </div >
  );
};


export default Settings;
