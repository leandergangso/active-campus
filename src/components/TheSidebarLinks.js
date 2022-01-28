import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons";

const TheSidebarLinks = ({ link }) => {
  let activeColor = '#5544FF'
  let defaultColor = '#908DB3'
  const location = useLocation()

  const _isSamePath = (path) => {
    return path.toLowerCase() === location.pathname.toLowerCase()
  }

  const setIconColor = (path) => {
    return _isSamePath(path) ? activeColor : defaultColor
  }

  const setTextColor = (path) => {
    return _isSamePath(path) ? 'text-dark' : 'text-placeholder'
  }

  return (
    <Link to={link.path} className='block pl-2 py-2 mx-auto cursor-pointer'>
      <div className="float-left py-2 px-4">
        <IconContext.Provider value={{ color: setIconColor(link.path), size: "1.5em" }}>
          {link.icon}
        </IconContext.Provider>
      </div>

      <div className={`px-4 py-2 hover:text-dark ${setTextColor(link.path)}`}>
        {link.name}
      </div>
    </Link>
  );
};

export default TheSidebarLinks;
