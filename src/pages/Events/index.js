import StatCard from './components/StatCard'
import EventCard from '../../components/EventCard'
import { MdControlPointDuplicate, MdArchive, MdDelete } from 'react-icons/md'

const index = () => {
    const options = [
        { icon: <MdControlPointDuplicate />, name: 'Dupliser' },
        { icon: <MdArchive />, name: 'Arkiver' },
        { icon: <MdDelete />, name: 'Slett' },
    ]

    const events = [
        {id: 1, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: {current: '11', max: '40'}, date: '01.03.2040', time: {from: '10:00', to: '17:30'}},
        {id: 2, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: {current: '11', max: '40'}, date: '01.03.2040', time: {from: '10:00', to: '17:30'}},
        {id: 3, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: {current: '11', max: '40'}, date: '01.03.2040', time: {from: '10:00', to: '17:30'}},
        {id: 4, title: 'Navn på arrangement', tags: 'tags...', location: 'Sandefjord 1234', signups: {current: '11', max: '40'}, date: '01.03.2040', time: {from: '10:00', to: '17:30'}},
    ]

    return (
        <div>
            <section className='mb-10'>
                <div className='mb-5'>
                    <h1 className="text-2xl font-bold">Oversikt</h1>
                    {/* ADD INPUT FIELDS HERE */}
                </div>

                <div className='flex flex-wrap gap-5 justify-between'>
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
                    <h1 className="text-2xl font-bold">Arrangementer</h1>
                    {/* ADD INPUT FIELDS HERE */}
                </div>

                <div className='flex flex-wrap gap-5 justify-between'>
                    {events.map(data => (
                        <EventCard key={data.id} options={options} data={data} />
                    ))}
                </div>
            </section>
        </div>
    );
};


export default index;
