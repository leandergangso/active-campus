import Button from '../../../components/Actions/Button';
import ColorPicker from '../../../components/Actions/ColorPicker';

const Style = ({prevStep, updateData, data, submit}) => {
  const onFormSubmit = () => {
    submit()
  }
  
  return (
    <div>
      <h1 className="mb-5 text-2xl self-center font-bold">Visuelt</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-80 sm:mr-20">
            
            <h3>Hoved farge</h3>
            <ColorPicker name='main' />

            <h3>Tekst farge</h3>
            <ColorPicker name='text' />

            <h3>Bakgruns farge</h3>
            <ColorPicker name='background' />

            <div>
              <input type="file" name="" id="" />
            </div>
            
          </div>

          <div className="flex flex-col gap-2 w-80">
            <h2 className='-mt-12 mb-5 text-xl font-bold'>Forhåndsvisning</h2>
            <div className='bg-light border-2 border-border justify-center flex h-96'>
              <h1 className='text-2xl font-bold self-center'>Preview component</h1>
            </div>
          </div>
        </div>

        <div className="flex mt-10 gap-5 flex-wrap sm:flex-nowrap sm:w-80">
          <Button onClick={onFormSubmit}>Ferdig</Button>
          <Button style='secondary' onClick={prevStep}>Forrige</Button>
        </div>
      </div>
    </div>
  );
};


export default Style;
