import { useNavigate } from "react-router-dom";
import Input from "components/Actions/Input";
import Button from "components/Actions/Button";
import TextArea from "components/Actions/TextArea";
import File from "components/Actions/File";

const Info = ({ nextStep, updateData, curryUpdate, data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Nytt arrangement</h1>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-80 sm:mr-10">
            <Input value={data.name} onChange={curryUpdate('name')} name='name' placeholder='Navn på arrangement' label='Navn' />
            <Input value={data.address} onChange={curryUpdate('address')} name='address' placeholder='Gate, by, post' label='Adresse' />

            <Input value={data.date} onChange={curryUpdate('date')} name='date' placeholder='Dato' type='date' label='Dato' />

            <div className="flex gap-5 justify-between">
              <Input value={data.start_time} onChange={curryUpdate('start_time')} name='start_time' placeholder='time' type='time' label='Start tid' />
              <Input value={data.end_time} onChange={curryUpdate('end_time')} name='end_time' placeholder='time' type='time' label='Slutt tid' />
            </div>
          </div>

          <div className="flex flex-col gap-5 w-80">
            <TextArea value={data.description} onChange={curryUpdate('description')} label="Beskrivelse" />
            <File onChange={(e) => updateData('image', e.target.files[0])} accept='image/*' label='Last opp bilde' />
          </div>
        </div>

        <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap sm:w-80">
          <Button onClick={nextStep}>Neste</Button>
          <Button styles='danger' onClick={() => navigate(-1)}>Avbryt</Button>
        </div>
      </div>
    </div>
  );
};


export default Info;
