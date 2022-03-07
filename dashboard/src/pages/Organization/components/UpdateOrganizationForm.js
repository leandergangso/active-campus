import Input from "../../../components/Actions/Input";
import Button from "../../../components/Actions/Button";
import Checkbox from "../../../components/Actions/Checkbox";
import { useEffect, useState } from "react";
import { useAppState } from "../../../contexts/AppContext";
import { deleteOrganization, setOrganization } from "../../../helpers/firestore";

const UpdateOrganizationForm = () => {
  const { state } = useAppState();
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [data, setData] = useState({
    name: '',
    short_name: '',
    org_number: '',
    contactEmail: '',
    contactName: '',
    contactTlf: '',
  });

  useEffect(() => {
    setConfirmation(false);
    setData({
      name: state.currentOrganization?.name || '',
      short_name: state.currentOrganization?.short_name || '',
      org_number: state.currentOrganization?.org_number || '',
      contactEmail: state.currentOrganization?.contact?.email || '',
      contactName: state.currentOrganization?.contact?.name || '',
      contactTlf: state.currentOrganization?.contact?.tlf || '',
    });
  }, [state.currentOrganization]);

  const updateData = (type, newData) => {
    if (type === 'name' && data.org_number !== '') {
      updateData('org_number', '');
    }
    setData(data => {
      return { ...data, [type]: newData };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (data.org_number === '') {
      return setError('Må velge en organisasjon.');
    }

    try {
      setError('');
      setOrganization(state.user.id, data.name, data.short_name, data.org_number, data.contactEmail, data.contactName, data.contactTlf);
      setConfirmation(false);
    }
    catch (error) {
      console.error(error);
      setError('Kunne ikke oppdatere organisasjon.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-10 mb-10">
        <div className='flex flex-col gap-5 max-w-md'>
          <div className="flex gap-5 justify-between w-80">
            <Input required disabled value={data.name} label='Navn' className='bg-background border border-border rounded-md px-4 py-2 w-full sm:w-72' />
            <Input required disabled value={data.org_number} label='Org-nr' className='bg-background border border-border rounded-md px-4 py-2 w-full sm:w-32 text-center' />
          </div>

          <Input required onChange={(e) => updateData('short_name', e.target.value)} label='Visningsnavn' value={data.short_name} placeholder='Visningsnavn' />

          <Checkbox
            required
            name='confirmation'
            checked={confirmation}
            onChange={() => { setConfirmation(!confirmation); }}
            label='Jeg bekrefter at jeg har rett til å ta besluttniger for denne organisasjonen.' />
        </div>

        <div className="flex flex-col gap-5">
          <Input required onChange={(e) => updateData('contactName', e.target.value)} label='Fult navn' value={data.contactName} name='name' placeholder='Fult navn' />
          <Input required onChange={(e) => updateData('contactEmail', e.target.value)} label='Email' value={data.contactEmail} name='email' type="email" placeholder='Min@epost.no' />
          <Input required onChange={(e) => updateData('contactTlf', e.target.value)} label='Tlf nummer' value={data.contactTlf} name='phone' placeholder='Telefon nummer' />
        </div>
      </div>

      {error && <p className="mb-5 text-danger">{error}</p>}

      <div className="flex gap-5 flex-wrap sm:flex-nowrap sm:w-80">
        <Button>Oppdater</Button>
        <Button onClick={() => deleteOrganization(state.currentOrganization.id)} style='danger'>Slett</Button>
      </div>
    </form>
  );
};

export default UpdateOrganizationForm;