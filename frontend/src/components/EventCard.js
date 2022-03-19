import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const navigate = useNavigate();

  const fromDateObj = new Date(event.date.from.seconds * 1000);
  const toDateObj = new Date(event.date.to.seconds * 1000);
  const date = `${('0' + fromDateObj.getDate()).slice(-2)}.${('0' + (fromDateObj.getMonth() + 1)).slice(-2)}.${fromDateObj.getFullYear()}`;
  const from = `${('0' + fromDateObj.getHours()).slice(-2)}:${('0' + fromDateObj.getMinutes()).slice(-2)}`;
  const to = `${('0' + toDateObj.getHours()).slice(-2)}:${('0' + toDateObj.getMinutes()).slice(-2)}`;

  let n = window.innerWidth > 400 ? 30 : 20;
  let address = `${event.address.street}, ${event.address.city}, ${event.address.zip}`;
  if (address.length > n) {
    address = address.substring(0, n) + '...';
  }

  return (
    <div className="relative bg-light rounded-md shadow-md sm:w-80 max-w-sm px-4 py-4 border border-transparent hover:border-border">
      <div onClick={() => navigate(event.id)} className='hover:cursor-pointer'>
        <h1 className="text-lg font-bold mb-2">{event.name}</h1>

        <img src={event.img} alt="image" className='mb-2 w-full h-full sm:h-32 object-cover border-2 border-dark' />

        <div className="flex flex-col gap-2">
          <div>
            <p>Sted: <span className="font-bold">{address}</span></p>
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
