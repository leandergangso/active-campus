import { useLocation, useSearchParams } from "react-router-dom";
import { MdMenu, MdAccountCircle, MdCircleNotifications } from 'react-icons/md';

import Dropdown from "../Actions/Dropdown";
import { useEffect } from "react";

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const organizationName = searchParams.get('organization')

	// * get this from server and save in cache (react-query)
	const organizations = [
		'Lentech',
		'Total Klima',
		'Komplett organization',
	]

	const getActiveNavRoute = () => {
		let curRoute = sidebarNav.find(route => location.pathname.split('/')[1].toLowerCase() == route.path.split('/')[1].toLowerCase())
		return curRoute?.name
	}

	const organizationChange = (e) => {
		console.log('change organization to:', e.target.value)
	}

	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3 className="flex items-center">{getActiveNavRoute()}</h3>

				<div className="flex flex-wrap gap-4">
					<Dropdown options={organizations} value={organizationName} onChange={organizationChange} />

					{/* just implement: users name on option dropdown, logout button and delete account */}
					<div>
						<MdAccountCircle className="fill-dark w-10 h-10" />
					</div>
					
					{/* notification, not implemented */}
					{/* <div>
						<MdCircleNotifications className="fill-dark w-10 h-10" />
					</div> */}
				</div>
			</div>
		</header>
	);
};

export default TheHeader;
