import { useLocation } from "react-router-dom";
import { MdMenu, MdAccountCircle } from 'react-icons/md';
import { useEffect, useState } from "react";
// import { getOrganizationList } from "../../helpers/firestore";
// import { useAuth } from "../../contexts/AuthContext";

import Dropdown from "../Actions/Dropdown";

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation();
	// const { currentUser } = useAuth();
	const [organizations, setOrganizations] = useState([]);

	// useEffect(async () => {
	// 	const organizations = [];
	// 	const docs = await getOrganizationList(currentUser.organizations);
	// 	docs.forEach(doc => {
	// 		const data = doc.data();
	// 		organizations.push(data.name);
	// 	});
	// 	setOrganizations(organizations);
	// }, []);

	const getActiveNavRoute = () => {
		let curRoute = sidebarNav.find(route => location.pathname.split('/')[1].toLowerCase() == route.path.split('/')[1].toLowerCase());
		return curRoute?.name;
	};

	const organizationChange = (e) => {
		console.log('change organization to:', e.target.value);
	};

	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3 className="flex items-center">{getActiveNavRoute()}</h3>

				<div className="flex flex-wrap gap-4">
					{organizations === [] && (
						<Dropdown options={organizations} onChange={organizationChange} />
					)}

					<div>
						<MdAccountCircle className="fill-dark w-10 h-10" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default TheHeader;
