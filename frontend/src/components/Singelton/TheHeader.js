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

	const options = [
		{ name: state.user.name },
		{ onClick: signout, component: <MdLogout className="fill-danger" />, name: 'Logg ut' },
		{ onClick: deleteCurrentUser, component: <MdDelete className="fill-danger" />, name: 'Slett bruker' },
	];

	const getActiveNavRoute = () => {
		let curRoute = sidebarNav.find(route => location.pathname.split('/')[1].toLowerCase() == route.path.split('/')[1].toLowerCase());
		return curRoute?.name;
	};

	const organizationChange = (e) => {
		const orgID = e.target.value;
		const org = state.organizations.find(org => org.id === orgID);
		setState('currentOrganization', org);
	};

	useEffect(() => {
		if (state.currentOrganization && Object.entries(state.currentOrganization).length === 0) {
			setState('currentOrganization', state.organizations[0]);
		}
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
						<Dropdown objValue='short_name' options={state.organizations} value={state.currentOrganization?.id} onChange={organizationChange} />
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
