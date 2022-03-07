import Input from "../../../components/Actions/Input";
import Button from "../../../components/Actions/Button";
import Checkbox from "../../../components/Actions/Checkbox";
import TextArea from "../../../components/Actions/TextArea";

const Settings = ({ prevStep, nextStep, updateData, curryUpdate, data }) => {
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Frister og varslinger</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-80 sm:mr-10">
            <div className="flex gap-5">
              <Input value={data.signupOpenDate} onChange={curryUpdate('signupOpenDate')} name='signupOpenDate' type='date' label='Påmelding åpnes' />
              <Input value={data.signupOpenTime} onChange={curryUpdate('signupOpenTime')} name='signupOpenTime' type='time' label='tid' />
            </div>

            <div className="flex gap-5">
              <Input value={data.signupCloseDate} onChange={curryUpdate('signupCloseDate')} name='signupCloseDate' type='date' label='Påmelding stenges' />
              <Input value={data.signupCloseTime} onChange={curryUpdate('signupCloseTime')} name='signupCloseTime' type='time' label='tid' />
            </div>

            <div>
              <Input value={data.maxParticipants} onChange={curryUpdate('maxParticipants')} name='maxParticipant' type='number' label='Max deltagere' />
            </div>

            <Checkbox checked={data.isWaitingList} onChange={(e) => updateData('isWaitingList', e.target.checked)} name='isWaitingList' label='Ta i bruk venteliste' />
            <Checkbox checked={data.isTicket} onChange={(e) => updateData('isTicket', e.target.checked)} name='isTicket' label='Send billett ved påmelding (QR-kode)' />
          </div>

          <div className="flex flex-col gap-2 w-80">
            <TextArea value={data.mailBody} onChange={curryUpdate('mailBody')} name='mailBody' label='E-mail' />
            <div className="text-placeholder">
              <h3 className="font-bold mb-1">Tilpasset e-mail verdier:</h3>
              <p>%navn% = Brukerens navn.</p>
              <p>%arrangement% = Arrangementets navn.</p>
              <p>%link% = Link til påmelding og info side.</p>
            </div>
          </div>
        </div>

        <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap sm:w-80">
          <Button onClick={nextStep}>Neste</Button>
          <Button style='secondary' onClick={prevStep}>Forrige</Button>
        </div>
      </div>
    </div>
  );
};


export default Settings;
