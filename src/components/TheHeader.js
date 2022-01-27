import { useLocation } from "react-router-dom";
import { MdMenu } from 'react-icons/md';

const TheHeader = ({ routes, setOpenSidebar }) => {
  const location = useLocation()

  const getRouteName = () => {
    // TODO: make this into a clickable breadcrumb
    let curRoute = routes.find(route => route.path.includes(location.pathname))
    if (curRoute) {
      let breadcrumb = curRoute.name
      return breadcrumb
    }
  }

  return (
    <header className="">
      <button onClick={() => setOpenSidebar(true)} className="cursor-pointer absolute top-0 left-0 m-2 md:hidden">
        <MdMenu size={32} />
      </button>

      <div className="m-2">
        <span>{getRouteName()}</span>
      </div>
    </header>
  );
};

export default TheHeader;
