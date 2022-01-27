import logo from '../assets/logo.png';
import OutsideClickWrapper from "./OutsideClickWrapper";
import TheSidebarLinks from "./TheSidebarLinks";

const TheSidebar = ({ routes, isSidebarOpen, setOpenSidebar }) => {
	return (
		<div className='z-50'>
			<OutsideClickWrapper onOutsideClick={() => setOpenSidebar(false)}>
				<aside className={'bg-light w-52 h-screen shadow-lg fixed top-0 duration-200 md:relative md:left-0 ' + (isSidebarOpen ? 'left-0' : '-left-52')}>
					<img src={logo} alt="logo" className="mx-auto w-40 py-6" />

					<nav onClick={() => setOpenSidebar(false)}>
						{routes.map(route => (
							<TheSidebarLinks key={route.path} route={route} />
						))}
					</nav>
				</aside>
			</OutsideClickWrapper>
		</div>
	)
}

export default TheSidebar;