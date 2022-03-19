import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppState } from "../../contexts/AppContext";
import { liveEvents } from "../../helpers/firestore";

import StatCard from './components/StatCard';
import EventsContainer from "./components/EventsContainer";
import Button from '../../components/Actions/Button';

const Index = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);
	const { state } = useAppState();

	const toggleArchive = () => {
		console.log('archived, get archived events from DB and replace');
		// get archived events from firestore
		// setEvents() with the new archived events
	};

	const onUpdate = (docs) => {
		const events = [];
		docs.forEach(doc => {
			events.push({ id: doc.id, ...doc.data() });
		});
		setEvents(events);
	};

	useEffect(() => {
		if (state.currentOrganization?.id) {
			const unsub = liveEvents(state.currentOrganization.id, onUpdate);
			return unsub;
		}
	}, [state.currentOrganization]);

	return (
		<div>
			{events.length > 0 && (
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
			)}

			<section className='mb-10'>
				<div className="flex flex-wrap gap-10 justify-between mb-5">
					<h1 className="text-2xl font-bold">Arrangementer</h1>

					{state.organizations.length > 0 &&
						<div className="flex gap-5 flex-wrap sm:flex-nowrap sm:w-80">
							<Button style='secondary' onClick={toggleArchive}>Se akriverte</Button>
							<Button onClick={() => navigate('create')}>Nytt arrangement</Button>
						</div>
					}
				</div>

				<EventsContainer events={events} />
			</section>
		</div>
	);
};


export default Index;
