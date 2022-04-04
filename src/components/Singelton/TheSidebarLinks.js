import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { useAppState } from "contexts/AppContext";

const TheSidebarLinks = ({ link }) => {
  const { state } = useAppState();
  let activeColor = '#5544FF';
  let defaultColor = '#908DB3';

  const setIconColor = () => {
    return state.breadCrum === link.name ? activeColor : defaultColor;
  };

  const setTextColor = () => {
    return state.breadCrum === link.name ? 'text-dark' : 'text-placeholder';
  };

  return (
    <Link to={link.path} className='block pl-2 py-2 mx-auto cursor-pointer outline-none active:bg-border hover:bg-border focus:bg-border'>
      <div className="float-left py-2 px-4">
        <IconContext.Provider value={{ color: setIconColor(), size: "1.5em" }}>
          {link.icon}
        </IconContext.Provider>
      </div>

      <div className={`px-4 py-2 ${setTextColor()}`}>
        {link.name}
      </div>
    </Link>
  );
};

export default TheSidebarLinks;
