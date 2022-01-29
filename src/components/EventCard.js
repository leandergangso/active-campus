import { MdMoreVert, MdControlPointDuplicate, MdArchive, MdDelete } from 'react-icons/md'

import Options from './Options'

function EventCard({ event }) {
  const options = [
    { icon: { component: <MdControlPointDuplicate />, color: '#1B1555' }, name: 'Dupliser' },
    { icon: { component: <MdArchive />, color: '#1B1555' }, name: 'Arkiver' },
    { icon: { component: <MdDelete />, color: '#FF4444' }, name: 'Slett' },
  ]

  return (
    <div className="relative bg-light rounded-md shadow-md shrink-0 grow w-full sm:w-5/12 md:w-5/12 xl:max-w-screen-sm px-4 py-4 border border-transparent hover:border hover:border-border">
      {/* <MdMoreVert className='absolute top-4 right-2 w-6 h-6 hover:cursor-pointer' /> */}
      <div className='absolute top-4 right-2'>
        <Options options={options} />
      </div>

      <h1 className="text-lg font-bold mb-2">{event.title}</h1>
      <p className='italic font-light mb-2'>{event.tags}</p>

      <div className="flex flex-wrap gap-2 justify-between pr-0 xl:pr-10">
        <div className="mr-10">
          <p>Sted: <span className="font-bold">{event.location}</span></p>
          <p>Påmeldte: <span className="font-bold">{event.signups.current} / {event.signups.max}</span></p>
        </div>

        <div>
          <p>Dato: <span className="font-bold">{event.date}</span></p>
          <p>Tid: <span className="font-bold">{event.time.from} - {event.time.to}</span></p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
