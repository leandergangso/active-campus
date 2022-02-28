import { useLocation } from "react-router-dom";
import { MdMenu, MdAccountCircle, MdLogout, MdDelete } from 'react-icons/md';
import { useAuth } from "../../contexts/AuthContext";
import { useAppState } from "../../contexts/AppContext";

import OptionWrapper from '../OptionWrapper';
import Dropdown from "../Actions/Dropdown";
import { useEffect, useState } from "react";

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation();
	const { signout, deleteCurrentUser } = useAuth();
	const { state, setState } = useAppState();
	const [organizations, setOrganizations] = useState([]);

	const options = [
		{ name: state.user.name },
		{ onClick: signout, component: <MdLogout />, name: 'Logg ut' },
		{ onClick: deleteCurrentUser, component: <MdDelete />, name: 'Slett bruker' },
	];

	const getActiveNavRoute = () => {
		let curRoute = sidebarNav.find(route => location.pathname.split('/')[1].toLowerCase() == route.path.split('/')[1].toLowerCase());
		return curRoute?.name;
	};

	const organizationChange = (e) => {
		const name = e.target.value;
		setState('currentOrganization', name);
	};

	useEffect(() => {
		const organizationsNames = [];
		state.organizations.map(org => {
			organizationsNames.push(org.name);
		});
		setOrganizations(organizationsNames);
	}, [state.organizations]);

	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3 className="flex items-center">{getActiveNavRoute()}</h3>

				<div className="flex flex-wrap gap-4">
					{state.organizations.length > 0 && (
						<Dropdown options={organizations} onChange={organizationChange} />
					)}

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
