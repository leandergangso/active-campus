import StatCard from './components/StatCard'
import InfoCard from '../../components/InfoCard'

const index = () => {
    return (
        <div>
            <section className='mb-10'>
                <div className='mb-5'>
                    <h1 className="text-2xl font-bold">Oversikt</h1>
                    {/* ADD INPUT FIELDS HERE */}
                </div>

                <div className='flex flex-wrap gap-10 justify-between'>
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

                <div>
                    <InfoCard more={true} >
                        This is some data ------------------------ -------------------- ----------------------------
                    </InfoCard>
                </div>
            </section>
        </div>
    );
};


export default index;
