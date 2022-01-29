import { useLocation } from "react-router-dom";
import { MdMenu, MdAccountCircle, MdCircleNotifications } from 'react-icons/md';

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation()

	// * get this from server and save in cache (react-query)
	const organizations = [
		{ id: 1, name: 'Lentech', role: 3 },
		{ id: 2, name: 'Total Klima', role: 2 },
	]

	const getRouteName = () => {
		// TODO: make this into a clickable breadcrumb
		// ! FIX FOR ROUTES NOT IN PROPS.ROUTE
		let curRoute = sidebarNav.find(route => route.path.includes(location.pathname))
		if (curRoute) {
			let breadcrumb = curRoute.name
			return breadcrumb
		}
	}

	// TODO: replace select with custom dropdown component bellow
	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3>{getRouteName()}</h3>

				<div className="flex gap-4">
					<select name="organizations">
						{organizations.map(organization => (
							<option key={organization.id} value={organization.id}>{organization.name}</option>
						))}
					</select>

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
