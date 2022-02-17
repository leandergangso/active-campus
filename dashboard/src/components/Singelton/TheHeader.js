import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdMenu, MdAccountCircle, MdCircleNotifications } from 'react-icons/md';

import Dropdown from "../Actions/Dropdown";
import { useEffect } from "react";

const TheHeader = ({ sidebarNav, setOpenSidebar }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const organizationName = searchParams.get('organization')

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

	const organizationChange = (e) => {
		console.log('change organization')
		// setQueryParam(e.target.value)
	}

	// const setQueryParam = (name) => {
	// 	navigate({
	// 		pathname: location.pathname,
	// 		search: `organization=${name}`
	// 	})
	// }

	// useEffect(() => {
	// 	// if (organizationName && organizations.some(name => organizationName === name)) {
	// 	if (organizationName) {
	// 		setQueryParam(organizationName)
	// 	} else {
	// 		setQueryParam(organizations[0])
	// 	}
	// }, [])

	return (
		<header>
			<button onClick={() => setOpenSidebar(true)} className="cursor-pointer lg:hidden">
				<MdMenu size={32} />
			</button>

			<div className="flex justify-between flex-wrap gap-4">
				<h3 className="flex items-center">{getActiveNavRoute()}</h3>

				<div className="flex flex-wrap gap-4">
					<Dropdown options={organizations} value={organizationName} onChange={organizationChange} />

					{/* no time to implement */}
					{/* <div>
						<MdAccountCircle className="fill-dark w-10 h-10" />
					</div> */}
					
					{/* no time to implement */}
					{/* <div>
						<MdCircleNotifications className="fill-dark w-10 h-10" />
					</div> */}
				</div>
			</div>
		</header>
	);
};

export default TheHeader;
