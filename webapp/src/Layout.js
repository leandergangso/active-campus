import { Outlet } from 'react-router-dom';
import TheSidebar from './components/TheSidebar';

function Layout(props) {
  return (
    <div>
      <TheSidebar routes={props.routes} />

      <div className=''>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
