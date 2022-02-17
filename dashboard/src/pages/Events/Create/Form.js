import Button from "../../../components/Actions/Button";
import FormCard from "../../../components/FormCard";

const Form = ({ prevStep, submit, updateData, data }) => {
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Påmeldings skjema</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5">

            <FormCard name='text' type='text' />
            <FormCard name='select' type='select' required />
            <FormCard name='radio' type='radio' />

            <Button onClick={()=>console.log('create new form field')}>Legg til nytt felt</Button>

            <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap">
              <Button onClick={submit}>Ferdig</Button>
              <Button style='secondary' onClick={prevStep}>Forrige</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Form;
