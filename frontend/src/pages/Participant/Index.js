import { useAppState } from "contexts/AppContext";
import { createTimestamp } from "helpers/firestore";
import { useNavigate } from "react-router-dom";
import EventCard from "components/EventCard";
import Button from "components/Actions/Button";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useAppState();

  // use and get the same event objects as the database
  state.events = [{
    id: '1',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XRcO27ILwLXjcnPPgROBhgHaE6%26pid%3DApi&f=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '2',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.seroundtable.com%2Fgoogle-events-1532691045.jpg&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '3',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2F6DGy7KSaoVk-rwbJG9wx4lD_lB6aShZ5Hr7Y35sQuVSgMS6sqNOKQMttpP3V34DEoqM5fpZkc_L7PfwKEmpgS-O1NzIxyzzvdbJm1Q&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '11',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.seroundtable.com%2Fgoogle-events-1532691045.jpg&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '21',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2FDFowFoB4BP47xdwVmGzxjn-1200-80.jpg&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '31',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iotforall.com%2Fwp-content%2Fuploads%2F2017%2F09%2F9.20-Google-Event-AMP-Image.jpg&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '12',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XRcO27ILwLXjcnPPgROBhgHaE6%26pid%3DApi&f=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '22',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fimages.seroundtable.com%2Fgoogle-events-1532691045.jpg&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },
  {
    id: '23',
    name: 'Test event',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date()),
      to: createTimestamp(new Date()),
    },
    address: {
      city: 'sandefjord',
      zip: '3222',
      street: 'street 12'
    },
    contact: {
      name: 'some name',
      email: 'some@email.no',
      tlf: '(+00) 000 00 000'
    },
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2F6DGy7KSaoVk-rwbJG9wx4lD_lB6aShZ5Hr7Y35sQuVSgMS6sqNOKQMttpP3V34DEoqM5fpZkc_L7PfwKEmpgS-O1NzIxyzzvdbJm1Q&f=1&nofb=1',
    signup_count: '10',
    max_participants: '30',
  },];

  state.events = [];

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-between items-center mb-5">
        <h1 className="font-bold text-2xl">Påmeldt</h1>

        <div className="flex gap-5 w-80">
          <Button onClick={() => navigate('/events/history')} styles={'secondary'}>Historikk</Button>
          <Button onClick={() => navigate('/events/explore')}>Utforsk</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {state.events.length !== 0 ? (
          state.events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-xl">Du er ikke meldt på noen arrangementer.</p>
        )}
      </div>
    </div>
  );
};

export default Index;