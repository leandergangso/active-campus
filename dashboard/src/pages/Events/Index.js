import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { liveEvents } from "../../helpers/firestore";

import StatCard from './components/StatCard';
import EventsContainer from "./components/EventsContainer";
import Button from '../../components/Actions/Button';

const Index = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);

	const onUpdate = (docs) => {
		const events = [];
		docs.forEach(doc => {
			events.push({ id: doc.id, ...doc.data() });
		});
		setEvents(events);
	};

	const toggleArchive = () => {
		console.log('archived, get archived events from DB and replace');
		// get archived events from firestore
		// setEvents() with the new archived events
	};

	useEffect(() => {
		const unsub = liveEvents('CAvHVKEO3XpuRqBI4Skm', onUpdate);
		return unsub;
	}, []);

	return (
		<div>
			<section className='mb-10'>
				<div className='mb-5'>
					<h1 className="text-2xl font-bold">Oversikt</h1>
				</div>

				<div className='flex flex-wrap gap-5'>
					<StatCard title='Aktive arrangementer' className='bg-dark'>
						KOMMER SNART
					</StatCard>
					<StatCard title='Avmeldte' className='bg-dark'>
						KOMMER SNART
					</StatCard>
					<StatCard title='Venteliste' className='bg-dark'>
						KOMMER SNART
					</StatCard>
					<StatCard title='Påmeldte' className='bg-dark'>
						KOMMER SNART
					</StatCard>
				</div>
			</section>

			<section className='mb-10 max-w-screen-xl'>
				<div className="flex flex-wrap gap-10 justify-between mb-5">
					<h1 className="text-2xl font-bold">Arrangementer</h1>
					<div className="flex gap-5">
						<Button style='secondary' onClick={toggleArchive}>Se akriverte</Button>
						<Button onClick={() => navigate('create')}>Nytt arrangement</Button>
					</div>
				</div>

				<EventsContainer events={events} />
			</section>
		</div>
	);
};


export default Index;
