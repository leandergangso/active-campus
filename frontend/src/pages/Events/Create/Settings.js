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
              <Input value={data.signup_open_date} onChange={curryUpdate('signup_open_date')} name='signup_open_date' type='date' label='Påmelding åpnes' />
              <Input value={data.signup_open_time} onChange={curryUpdate('signup_open_time')} name='signup_open_time' type='time' label='tid' />
            </div>

            <div className="flex gap-5">
              <Input value={data.signup_close_date} onChange={curryUpdate('signup_close_date')} name='signup_close_date' type='date' label='Påmelding stenges' />
              <Input value={data.signup_close_time} onChange={curryUpdate('signup_close_time')} name='signup_close_time' type='time' label='tid' />
            </div>

            <div>
              <Input
                value={data.max_participants}
                onChange={curryUpdate('max_participants')}
                name='max_participants'
                type='number'
                min='0'
                label={<div>Max deltagere <span className="text-placeholder text-sm">(0 = ubegrenset)</span></div>}
              />
            </div>

            {data.max_participant !== '0' &&
              <Checkbox checked={data.is_waiting_list}
                onChange={(e) => updateData('is_waiting_list', e.target.checked)}
                name='is_waiting_list'
                label='Ta i bruk venteliste'
              />
            }
            <Checkbox checked={data.is_ticket}
              onChange={(e) => updateData('is_ticket', e.target.checked)}
              name='is_ticket'
              label={<>Send billett ved påmelding <span className="text-placeholder text-sm">(QR-kode)</span></>}
            />
          </div>

          <div className="flex flex-col gap-2 w-80">
            <TextArea value={data.email_body} onChange={curryUpdate('email_body')} name='email_body' label='E-mail' />
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
