import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import logo from '../assets/logo.png';

const TheSidebar = (props) => {
    let activeColor = '#5544FF'
    let defaultColor = '#908DB3'
    let location = useLocation()

    const setIconColor = (path) => {
        return path.toLowerCase() === location.pathname.toLowerCase() ? activeColor : defaultColor
    }

    const setTextColor = (path) => {
        return path.toLowerCase() === location.pathname.toLowerCase() ? 'text-dark' : 'text-placeholder'
    }

    return (
        <aside className="bg-light w-64 h-screen shadow-lg fixed top-0 left-0 z-50">
            <header className="py-6">
                {/* <img src={logo} alt="logo" className="mx-auto w-8/12 pb-2" /> */}
                <img src={logo} alt="logo" className="mx-auto w-44 pb-2" />
            </header>

            <nav>
                {props.routes.map(route => (
                    <Link key={route.path} to={route.path} className={`block mb-4 w-3/4 mx-auto cursor-pointer ${setTextColor(route.path)}`}>
                        <div className="float-left py-2 px-4">
                            <IconContext.Provider value={{ color: setIconColor(route.path), size: "1.5em" }}>
                                {route.icon}
                            </IconContext.Provider>
                        </div>
                        <div className={`px-4 py-2 hover:text-dark ${setTextColor(route.path)}`}>
                            {route.name}
                        </div>
                    </Link>

                    // <div key={route.name} className="py-4 w-3/4 mx-auto">
                    //     <div className="float-left mx-auto">
                    //         <IconContext.Provider value={{ color: setIconColor(route.path), size: "1.5em" }}>
                    //             {route.icon}
                    //         </IconContext.Provider>
                    //     </div>
                    //     <Link to={route.path} className={`px-4 py-2 cursor-pointer ${setTextColor(route.path)}`}>{route.name}</Link>
                    // </div>
                ))}
            </nav>
        </aside>
    )
}

export default TheSidebar;