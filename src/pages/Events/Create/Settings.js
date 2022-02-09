import Input from "../../../components/Actions/Input";
import Dropdown from "../../../components/Actions/Dropdown";
import Button from "../../../components/Actions/Button";

const Settings = ({ prevStep, nextStep, updateData, data }) => {
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Frister og varslinger</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-80 sm:mr-10">
            <Input name='name' placeholder='Navn på arrangement' label='Arrangement navn*' />
            <Input name='organizor' placeholder='Navn på arrangør' label='Navn på arrangør*' />
            <Input name='address' placeholder='Adresse for arrangement' label='Adresse for arrangement*' />

            <div className="flex gap-5">
              <Input name='start' placeholder='time' type='time' label='Start tid*' />
              <Input name='end' placeholder='time' type='time' label='Slutt tid*' />
            </div>

            <Input name='date' placeholder='Dato' type='date' label='Dato*' />
          </div>

          <div className="flex flex-col gap-2 w-80">


            {/* replace with textarea component */}
            <label htmlFor="description">Beskrivelse</label>
            <textarea className="border border-border outline-none rounded-md p-2 resize-none focus:border-dark" id="description" rows="10" defaultValue={data.description} />


          </div>
        </div>

        <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap sm:w-80">
          <Button text='Neste' onClick={nextStep} />
          <Button text='Forrige' style='secondary' onClick={prevStep} />
        </div>
      </div>
    </div>
  );
};


export default Settings;
