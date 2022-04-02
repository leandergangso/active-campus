import { MdDelete, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import OptionWrapper from 'components/OptionWrapper';

function EventCard({ event, onClick }) {
  const navigate = useNavigate();

  const fromDateObj = new Date(event.date.from.seconds * 1000);
  const toDateObj = new Date(event.date.to.seconds * 1000);
  const date = `${('0' + fromDateObj.getDate()).slice(-2)}.${('0' + (fromDateObj.getMonth() + 1)).slice(-2)}.${fromDateObj.getFullYear()}`;
  const from = `${('0' + fromDateObj.getHours()).slice(-2)}:${('0' + fromDateObj.getMinutes()).slice(-2)}`;
  const to = `${('0' + toDateObj.getHours()).slice(-2)}:${('0' + toDateObj.getMinutes()).slice(-2)}`;

  const options = [
    // { action: () => { console.log('copy'); }, icon: { component: <MdControlPointDuplicate />, color: '#1B1555' }, name: 'Dupliser' },
    // { action: () => { console.log('archive'); }, icon: { component: <MdArchive />, color: '#1B1555' }, name: 'Arkiver' },
    { onClick: () => { console.log('delete, use method from firestore'); }, component: <MdDelete className='fill-danger' />, name: 'Slett' },
  ];

  let n = 20;
  if (event.address.length > n) {
    event.address = event.address.substring(0, n) + '...';
  }

  return (
    <div className="relative bg-light rounded-md shadow-md grow w-full sm:w-5/12 px-4 py-4 border border-transparent hover:border-border">
      <div className='absolute top-4 right-2'>
        <OptionWrapper options={options}>
          <MdMoreVert className='w-6 h-6' />
        </OptionWrapper>
      </div>

      <div onClick={() => navigate(event.id)} className='hover:cursor-pointer'>
        <h1 className="text-lg font-bold mb-2">{event.name}</h1>
        {/* <p className='italic font-light mb-2'>{event.tags}</p> */}

        <div className="flex flex-wrap gap-2 justify-between pr-0">
          <div className="w-full lg:w-4/6">
            <p>Sted: <span className="font-bold">{event.address}</span></p>
            <p>Påmeldte: <span className="font-bold">{event.signup_count} / {event.max_participants}</span></p>
          </div>

          <div className='mr-10'>
            <p>Dato: <span className="font-bold">{date}</span></p>
            <p>Tid: <span className="font-bold">{from} - {to}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
