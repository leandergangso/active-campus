import TextArea from 'components/Actions/TextArea';
import Button from '../../components/Actions/Button';

const Index = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Gi oss tilbakemelding</h1>

      <div className="flex my-5 gap-14">
        <div className="flex flex-col gap-2">
          <TextArea label="Beskrivelse" />
        </div>

        <div className="flex flex-col gap-2 mt-7">
          <div className="flex gap-5">
            <input type="radio" name="type" id="1" />
            <label htmlFor="1">Forslag til ny funksjon</label>
          </div>
          <div className="flex gap-5">
            <input type="radio" name="type" id="2" />
            <label htmlFor="2">Forslag til forbedringer</label>
          </div>
          <div className="flex gap-5">
            <input type="radio" name="type" id="3" />
            <label htmlFor="3">Oppdaget en feil</label>
          </div>
        </div>
      </div>

      <Button>Send</Button>
    </div>
  );
};

export default Index;