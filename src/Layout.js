import { Outlet } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import TheSidebar from './components/TheSidebar';
import TheHeader from './components/TheHeader';

function Layout(props) {
  return (
    <div>
      <TheSidebar routes={props.routes} />

      <div>
        <TheHeader routes={props.routes} />
      </div>

      <PageTransition>
        <div className='float-right'>
          <Outlet />
        </div>
      </PageTransition>
    </div>
  );
}

export default Layout;
