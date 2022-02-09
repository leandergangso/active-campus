import { useNavigate } from "react-router-dom";

import StatCard from '../../components/StatCard'
import EventCard from '../../components/EventCard'
import Button from '../../components/Actions/Button';
import Dropdown from '../../components/Actions/Dropdown';

const Index = () => {
    const navigate = useNavigate();

    // * get from server and save in cache
    const events = [
        { id: 1, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: { current: '11', max: '40' }, date: '01.03.2040', time: { from: '10:00', to: '17:30' } },
        { id: 2, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234, Breidablikk en lang tekst som er', signups: { current: '11', max: '40' }, date: '01.03.2040', time: { from: '10:00', to: '17:30' } },
        { id: 3, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234, Breidablikk', signups: { current: '11', max: '40' }, date: '01.03.2040', time: { from: '10:00', to: '17:30' } },
        { id: 4, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: { current: '11', max: '40' }, date: '01.03.2040', time: { from: '10:00', to: '17:30' } },
    ]

    return (
        <div>
            <section className='mb-10'>
                <div className='mb-5'>
                    <h1 className="text-2xl font-bold">Oversikt</h1>
                </div>

                <div className='flex flex-wrap gap-5 2xl:gap-x-10'>
                    <StatCard title='Aktive arrangementer' bgColor='bg-dark'>
                        DATA HERE
                    </StatCard>
                    <StatCard title='Avmeldte' bgColor='bg-dark'>
                        DATA HERE
                    </StatCard>
                    <StatCard title='Venteliste' bgColor='bg-dark'>
                        DATA HERE
                    </StatCard>
                    <StatCard title='Påmeldte' bgColor='bg-dark'>
                        DATA HERE
                    </StatCard>
                </div>
            </section>

            <section className='mb-10'>
                <div className='mb-5'>
                    <div className='flex flex-wrap gap-5'>
                        <h1 className="text-2xl font-bold mr-20">Arrangementer</h1>

                        <div className='flex flex-wrap gap-5'>
                            {/* search bar */}
                            {/* checkbox dropdown */}
                            <Button style='secondary' text='Se akriverte' onClick={() => console.log('archived, get archived events from DB and replace')} />
                            <Button text='Nytt arrangement' onClick={() => navigate('create')} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap gap-5 2xl:gap-x-10'>
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
};


export default Index;
