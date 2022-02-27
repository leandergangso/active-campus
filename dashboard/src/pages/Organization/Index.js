import { useNavigate } from "react-router-dom";
import { useAppState } from "../../contexts/AppContext";
import { useEffect } from "react";

import OrganizationCard from './components/OrganizationCard';
import OrganizationForm from "./components/OrganizationForm";
import Button from '../../components/Actions/Button';

const Index = () => {
	const navigate = useNavigate();
	const { state } = useAppState();

	// * get from server and save in cache
	const organizations = [
		{ id: 1, name: 'Navn på organisasjon', nr: '123 321 123', contact: { name: 'Leander Gangso', mail: 'min@mail.no', tlf: '+47 000 000 000' } },
		{ id: 2, name: 'Navn på organisasjon', nr: '123 321 123', contact: { name: 'Leander Gangso', mail: 'min@mail.no', tlf: '+47 000 000 000' } },
		{ id: 3, name: 'Navn på organisasjon', nr: '123 321 123', contact: { name: 'Leander Gangso', mail: 'min@mail.no', tlf: '+47 000 000 000' } },
		{ id: 4, name: 'Navn på organisasjon', nr: '123 321 123', contact: { name: 'Leander Gangso', mail: 'min@mail.no', tlf: '+47 000 000 000' } },
	];

	useEffect(() => {
		if (state.organizations.length === 0) {
			navigate('./create');
		}
	});

	return (
		<div>
			<section className='mb-10'>
				<div className='mb-5'>
					<h1 className="text-2xl font-bold">Gjeldene organisasjon</h1>
				</div>
				<OrganizationForm organization={organizations[1]} submitName='Oppdater' secondaryName='Slett'
					onSubmit={() => console.log('create new organization, and go back to organization page.')}
					onSecondary={() => console.log('delete current organization, auto select next in list, hide if no organization exists.')}
				/>
			</section>

			<section className='mb-10 max-w-screen-xl'>
				<div className='mb-5'>
					<div className='flex flex-wrap gap-5 justify-between'>
						<h1 className="text-2xl font-bold">Andre organisasjoner</h1>

						<div className='flex flex-wrap gap-5 w-full sm:w-fit'>
							<Button onClick={() => navigate('create')}>Ny organisasjon</Button>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap gap-5 2xl:gap-x-10'>
					{organizations.map(organization => (
						<OrganizationCard key={organization.id} organization={organization} />
					))}
				</div>
			</section>
		</div>
	);
};


export default Index;
