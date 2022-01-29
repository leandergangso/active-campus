// todo: change to grid instead

function EventCard({ options, data }) {
  return (
    <div className="bg-light rounded-md shadow-md w-5/12 grow px-4 py-4 hover:outline-2 hover:outline-border">
      <h1>{data.title}</h1>
      <span className=''>{data.tags}</span>
      <p>Sted: {data.location}</p>
      <p>Påmeldte: {data.signups.current} / {data.signups.max}</p>
      <p>Dato: {data.date}</p>
      <p>Tid: {data.time.from} - {data.time.to}</p>
    </div>
  );
}

export default EventCard;
