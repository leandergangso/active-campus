import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../contexts/AppContext";

import OrganizationCard from './components/OrganizationCard';
import UpdateOrganizationForm from "./components/UpdateOrganizationForm";
import Button from '../../components/Actions/Button';

const Index = () => {
	const navigate = useNavigate();
	const { state } = useAppState();

	if (state.organizations.length === 0) {
		return (
			<div>
				<h1 className="text-2xl font-bold mb-5">Organisasjoner</h1>
				<div>
					<p className="text-xl text-placeholder">Ingen organisasjoner tilgjengelig.</p>
					<p className="text-xl text-placeholder">Bli invitert eller opprett en organisasjon <Link to='/organizations/create' className='text-primary'>her</Link>.</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<section className='mb-10'>
				<div className='mb-5'>
					<h1 className="text-2xl font-bold">Gjeldene organisasjon</h1>
				</div>
				<UpdateOrganizationForm />
			</section>

			<section className='mb-10 max-w-screen-xl'>
				<div className='mb-5'>
					<div className='flex flex-wrap gap-5 justify-between'>
						<h1 className="text-2xl font-bold">Andre organisasjoner</h1>

						<div className='flex flex-wrap gap-5 w-full sm:w-40'>
							<Button onClick={() => navigate('create')}>Ny organisasjon</Button>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap gap-5'>
					{state.organizations.map(organization => (
						<OrganizationCard key={organization.id} organization={organization} />
					))}
				</div>
			</section>
		</div>
	);
};


export default Index;
