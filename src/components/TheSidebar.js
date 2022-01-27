import { MdMenu } from 'react-icons/md';
import { useState } from "react";
import logo from '../assets/logo.png';
import OutsideClickWrapper from "./OutsideClickWrapper";
import TheSidebarLinks from "./TheSidebarLinks";

const TheSidebar = ({ routes }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<OutsideClickWrapper onOutsideClick={() => setIsOpen(false)} className="z-50">
			<button onClick={toggleSidebar} className="cursor-pointer absolute top-0 left-0 m-2 md:hidden">
				<MdMenu size={32} />
			</button>

			<aside className={'bg-light w-52 h-screen fixed shadow-lg top-0 duration-200 md:left-0 ' + (isOpen ? 'left-0' : '-left-52')}>
				<img src={logo} alt="logo" className="mx-auto w-40 py-6" />

				<nav onClick={toggleSidebar}>
					{routes.map(route => (
						<TheSidebarLinks key={route.path} route={route} />
					))}
				</nav>
			</aside>
		</OutsideClickWrapper>
	)
}

export default TheSidebar;