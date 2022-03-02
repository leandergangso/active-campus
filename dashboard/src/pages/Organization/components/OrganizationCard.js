import { useAppState } from '../../../contexts/AppContext';

function OrganizationCard({ organization }) {
  const { state, setState } = useAppState();
  let bgState = 'border-transparent hover:border-border';

  if (organization.id === state.currentOrganization?.id) {
    bgState = 'border-dark hover:border-dark';
  }

  return (
    <div
      onClick={() => setState('currentOrganization', organization)}
      className={"relative bg-light rounded-md shadow-md grow w-full sm:w-5/12 px-4 py-4 border hover:border hover:cursor-pointer " + bgState}
    >
      <div>
        <div className='flex flex-wrap mb-2'>
          <h1 className="text-lg font-bold mr-4">{organization.short_name}</h1>
          <p className='italic font-light self-center'>{organization.org_number}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Kontakt person: <span className="font-bold">{organization.contact.name}</span></p>
          <p>Mail: <span className="font-bold">{organization.contact.email}</span></p>
          <p>Tlf: <span className="font-bold">{organization.contact.tlf}</span></p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
