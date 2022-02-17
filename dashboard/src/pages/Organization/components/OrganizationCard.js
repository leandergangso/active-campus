import { MdControlPointDuplicate, MdArchive, MdDelete } from 'react-icons/md'

import Options from '../../../components/Options'

function OrganizationCard({ organization }) {
  const options = [
    { action: () => { console.log('delete') }, icon: { component: <MdDelete />, color: '#FF4444' }, name: 'Slett' },
  ]

  return (
    <div onClick={() => console.log("clicked")} className="relative bg-light rounded-md shadow-md shrink-0 grow w-full sm:w-5/12 px-4 py-4 border border-transparent hover:border hover:border-border hover:cursor-pointer">
      <div className='absolute top-2 right-2'>
        <Options options={options} />
      </div>

      <div>
        <div className='flex flex-wrap gap-5 mb-2'>
          <h1 className="text-lg font-bold">{organization.name}</h1>
          <p className='italic font-light self-center mr-10'>{organization.nr}</p>
        </div>

        <div className="flex flex-col gap-2 justify-between pr-0 xl:pr-10">
          <div>
            <p>Kontakt person: <span className="font-bold">{organization.contact.name}</span></p>
          </div>

          <div className='flex gap-5 flex-wrap'>
            <p>Mail: <span className="font-bold">{organization.contact.mail}</span></p>
            <p>Tlf: <span className="font-bold">{organization.contact.tlf}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
