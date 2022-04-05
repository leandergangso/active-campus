function EventCard({ event, onClick }) {
  // ! put this logic inside firestore.js on every event that is passed onto the state
  const fromDateObj = new Date(event.date.from.seconds * 1000);
  const toDateObj = new Date(event.date.to.seconds * 1000);
  const date = `${('0' + fromDateObj.getDate()).slice(-2)}.${('0' + (fromDateObj.getMonth() + 1)).slice(-2)}.${fromDateObj.getFullYear()}`;
  const from = `${('0' + fromDateObj.getHours()).slice(-2)}:${('0' + fromDateObj.getMinutes()).slice(-2)}`;
  const to = `${('0' + toDateObj.getHours()).slice(-2)}:${('0' + toDateObj.getMinutes()).slice(-2)}`;

  let n = window.innerWidth > 400 ? 30 : 20;
  // let address = `${event.address.street}, ${event.address.city}, ${event.address.zip}`;
  let address = event.address;
  if (address.length > n) {
    address = address.substring(0, n) + '...';
  }

  return (
    <div className="relative bg-light rounded-md shadow-md sm:w-80 min-w-full sm:min-w-fit max-w-sm px-4 py-4 border border-transparent hover:border-border">
      <div onClick={onClick} className='hover:cursor-pointer'>
        <div className="flex justify-between mb-2">
          <h1 className="text-lg font-bold">{event.name}</h1>
          <h3 className="self-center text-sm text-placeholder">{event?.organizer}</h3>
        </div>

        <img src={event.image} alt="bilde" className='flex justify-center items-center mb-2 w-full h-full sm:h-32 object-cover border-2 border-dark' />

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
