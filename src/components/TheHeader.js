import { useLocation } from "react-router-dom";
import { MdMenu, MdAccountCircle, MdCircleNotifications } from 'react-icons/md';
import Dropdown from "./Actions/Dropdown";

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation()

	// * get this from server and save in cache (react-query)
	const organizations = [
		'Lentech',
		'Total Klima',
		'Komplett organization',
	]

	const getActiveNavRoute = () => {
		let curRoute = sidebarNav.find(route => location.pathname.includes(route.path))
		return curRoute.name
	}

	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3 className="flex items-center">{getActiveNavRoute()}</h3>

				<div className="flex flex-wrap gap-4">
					<Dropdown options={organizations} />

					<div>
						<MdAccountCircle className="fill-dark w-10 h-10" />
					</div>

					<div>
						<MdCircleNotifications className="fill-dark w-10 h-10" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default TheHeader;
