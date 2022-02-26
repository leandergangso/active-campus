import { MdControlPointDuplicate, MdArchive, MdDelete } from 'react-icons/md';

import OptionWrapper from '../../../components/OptionWrapper';

function EventCard({ event }) {
  const options = [
    { action: () => { console.log('copy'); }, icon: { component: <MdControlPointDuplicate />, color: '#1B1555' }, name: 'Dupliser' },
    { action: () => { console.log('hide'); }, icon: { component: <MdArchive />, color: '#1B1555' }, name: 'Arkiver' },
    { action: () => { console.log('delete'); }, icon: { component: <MdDelete />, color: '#FF4444' }, name: 'Slett' },
  ];

  // let n = 20;
  // if (event.location.length > n) {
  //   event.location = event.location.substring(0, n) + '...';
  // }

  return (
    <div onClick={() => console.log("clicked")} className="relative bg-light rounded-md shadow-md shrink-0 grow w-full sm:w-5/12 px-4 py-4 border border-transparent hover:border hover:border-border hover:cursor-pointer">
      <div className='absolute top-2 right-2'>
        {/* <Options options={options} /> */}
      </div>

      <div>
        <h1 className="text-lg font-bold mb-2">{event.title}</h1>
        <p className='italic font-light mb-2'>{event.tags}</p>

        <div className="flex flex-wrap gap-2 justify-between pr-0 xl:pr-10">
          <div className="w-full lg:w-4/6">
            <p>Sted: <span className="font-bold">{event.location}</span></p>
            <p>Påmeldte: <span className="font-bold">{event.signups.current} / {event.signups.max}</span></p>
          </div>

          <div>
            <p>Dato: <span className="font-bold">{event.date}</span></p>
            <p>Tid: <span className="font-bold">{event.time.from} - {event.time.to}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
