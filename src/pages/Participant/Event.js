import { MdToday, MdAccessTime, MdLocationOn, MdSupervisorAccount, MdQrCode2 } from "react-icons/md";
import { useAppState } from "contexts/AppContext";
import { createTimestamp } from "helpers/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Actions/Button";
import QRCode from "react-qr-code";

const Event = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAppState();
  const [event, setEvent] = useState();

  // ! use and get the same event objects as the database - remove
  const now = + new Date();
  state.events = [{
    id: '1',
    name: 'Test event',
    organization: 'Active Campus',
    description: 'this is a random description',
    date: {
      from: createTimestamp(new Date(now + (3 * 20 * 60 * 60 * 1000))),
      to: createTimestamp(new Date(now + (3 * 24 * 60 * 60 * 1000))),
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
  }];

  // ! needs to check for valid/invalid id-event number
  // state.events = [];

  useEffect(() => {
    const event = state.events.find(event => {
      return event.id === id;
    });
    setEvent(event);
  }, []);

  return (
    <div className="flex flex-col gap-5 sm:max-w-sm">
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-bold text-2xl">{event?.name}</h1>
        <h2 className="font-bold text-md text-placeholder">{event?.organization}</h2>
      </div>

      <img src={event?.img} alt="arrangement-bilde" className='border-2 border-dark rounded-md' />

      <div className="flex sm:w-full gap-5">
        <Button onClick={() => navigate('discussion')} styles={'secondary'}>Diskusjon</Button>
        <Button onClick={() => console.log('firebase add user to event')}>Meld på</Button>
      </div>

      <div className="flex flex-col gap-5 border border-border bg-light rounded-md p-4 -mx-4 sm:mx-0">
        <div className="flex gap-2 sm:gap-5">
          <div className="flex items-center gap-2">
            <MdToday size={24} className='fill-primary' />
            <span>20.03.2023</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime size={24} className='fill-primary' />
            <div className="flex flex-col">
              <span>20:00 - 23:00</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <MdLocationOn size={24} className='fill-primary' />
          <span>Briedablikk 12, Sandefjord 3229</span>
        </div>

        <div className="flex gap-2">
          <MdSupervisorAccount size={24} className='fill-primary' />
          <span>30 / 55 påmeldte</span>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Informasjon</h3>
          <p>{event?.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Påmelding</h3>
          <p>Åpner: <span className="font-bold">20.02.2023</span></p>
          <p>Stenger: <span className="font-bold">13.03.2023</span></p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-1">Avmelding</h3>
          <p>Siste frist: <span className="font-bold">18.02.2023</span></p>
          <p>Avmelding er ikke tillatt for dette arrangementet.</p>
        </div>
      </div>

      {ShowQR()}
    </div>
  );
};

const ShowQR = () => {
  const qrValue = 'get from state';
  const [show, setShow] = useState(false);

  // add check if user is signup on event
  if (true) {
    return (
      <div onClick={() => setShow(!show)} className='hover:cursor-pointer w-fit'>
        {show ? <QRCode
          value={qrValue}
          level="M"
          bgColor="#F4F7FC"
          className="my-5"
        />
          :
          <div className="flex gap-5 items-center">
            <span className="font-bold">QR-kode (klikk):</span>
            <MdQrCode2 size={55} />
          </div>
        }
      </div>
    );
  }
};

export default Event;