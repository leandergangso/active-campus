import Input from "../../../components/Actions/Input"
import Button from "../../../components/Actions/Button"
import Checkbox from "../../../components/Actions/Checkbox"

const OrganizationForm = ({ organization, submitName, secondaryName, onSubmitClick, onSecondaryClick }) => {

  return (
    <div>
      <div className="flex flex-wrap gap-10 mb-10">
        <div>
          <div className="flex flex-wrap gap-5">
            <Input name='name' label='Navn' placeholder='Organisasjon navn' />
            <Input name='number' label='Org nr' type="number" placeholder='xxx xxx xxx' />
          </div>

          <Input name='shortname' label='Visningsnavn' placeholder='Visningsnavn' />
          <Checkbox name='confirmation' label='Jeg bekrefter at jeg har rett til å ta besluttniger for denne organisasjonen.' />
        </div>

        <div>
          <h3 className="font-bold">Kontakt person</h3>
          <Input name='test' label='Navn' placeholder='Fult navn' />
          <Input name='test' label='Epost' placeholder='Min@epost.no' />
          <Input name='test' label='Telefon' placeholder='Telefon nummer' />
        </div>
      </div>

      <div className="flex gap-5">
        <Button onClick={onSubmitClick}>{submitName}</Button>
        <Button onClick={onSecondaryClick} style='danger'>{secondaryName}</Button>
      </div>
    </div>
  )
}

export default OrganizationForm