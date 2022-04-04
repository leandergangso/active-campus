import { MdMenu, MdKeyboardBackspace, MdAccountCircle, MdLogout, MdDelete } from 'react-icons/md';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { useAppState } from "contexts/AppContext";
import { useEffect } from "react";

import OptionWrapper from '../OptionWrapper';

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { signout, deleteCurrentUser } = useAuth();
	const { state, setState } = useAppState();

	const options = [
		{ name: state.user.name },
		{ onClick: signout, component: <MdLogout className="fill-danger" />, name: 'Logg ut' },
		{ onClick: deleteCurrentUser, component: <MdDelete className="fill-danger" />, name: 'Slett bruker' },
	];

	useEffect(() => {
		const curRoute = sidebarNav.find(route => location.pathname.toLowerCase() === route.path.toLowerCase());
		if (curRoute?.name) {
			setState('breadCrum', curRoute?.name);
		}
		if (state.currentOrganization && Object.entries(state.currentOrganization).length === 0) {
			setState('currentOrganization', state.organizations[0]);
		}
	}, []);

	return (
		<header className="flex flex-row gap-5">
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={36} />
			</button>

			{window.innerWidth > 800 && (
				<button onClick={() => navigate(-1)} className='self-center hover:cursor-pointer text-xl'>
					<MdKeyboardBackspace
						size={30}
					/>
				</button>
			)
			}

			<h3 className="flex items-center">{state.breadCrum}</h3>

			<div className="flex justify-between flex-wrap gap-4 ml-auto">
				<div className="flex flex-wrap ml-auto gap-4">
					<h3 className="font-bold self-center mb-1">{state.currentOrganization?.short_name}</h3>

					<div>
						<OptionWrapper options={options}>
							<MdAccountCircle className="fill-dark w-10 h-10" />
						</OptionWrapper>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TheHeader;
