import { IconContext } from "react-icons";

const Sidebar = (props) => {
    return (
        <aside>
            <nav>
                {props.routes.map(route => (
                    <div>
                        <IconContext.Provider value={{ color: "black", size: "1.5em" }}>
                            {route.icon}
                        </IconContext.Provider>
                        <a href={route.route}>{route.name}</a>
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar;