import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';
// import TheLoading from './TheLoading';

// const loading = (props) => {
//   return (
//     <div className='absolute left-0 right-0 backdrop-blur-xl w-screen h-screen bg-danger'>
//       <TheLoading size={100} />
//     </div>
//   )
// }

// * idea
// split up even further?
// create a dashboard component that contains the other components for the dashboard
// also create a event singup component
// then check url and user state to determine which component to render with conditional rendering (dashboard or event signup)
// also then need to restructure the file sturecture a bit...

function Layout() {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  const sidebarNav = [
    { path: '/events', name: 'Arrangementer', icon: <MdCalendarToday /> },
    { path: '/organizations', name: 'Organisasjoner', icon: <MdOutlineBusiness /> },
    { path: '/users', name: 'Brukere', icon: <MdSupervisedUserCircle /> },
    // { path: '/settings', name: 'Innstillinger', icon: <MdSettings /> },
    { path: '/feedback', name: 'Tilbakemelding', icon: <MdFeedback /> },
  ]

  return (
    <div className='flex h-screen max-w-[1920px] mx-auto text-dark bg-background shadow-dark shadow-xl'>
      <TheSidebar sidebarNav={sidebarNav} isSidebarOpen={isSidebarOpen} setOpenSidebar={setOpenSidebar} />

      <div className='relative overflow-x-hidden flex flex-col w-full pt-4 px-8 lg:pt-8 lg:px-12'>
        <TheHeader sidebarNav={sidebarNav} setOpenSidebar={setOpenSidebar} />

        <div className='w-fit mt-5 mb-20'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
