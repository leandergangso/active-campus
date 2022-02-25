import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';

// ! delete
import { useAuth } from '../../contexts/AuthContext';
import { testing } from '../../helpers/firestore';

function Layout() {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  const sidebarNav = [
    { path: '/events', name: 'Arrangementer', icon: <MdCalendarToday /> },
    { path: '/organizations', name: 'Organisasjoner', icon: <MdOutlineBusiness /> },
    { path: '/users', name: 'Brukere', icon: <MdSupervisedUserCircle /> },
    { path: '/feedback', name: 'Tilbakemelding', icon: <MdFeedback /> },
  ]

  // ! delete
  const { signout } = useAuth()

  return (
    <div className='flex h-screen max-w-[1920px] mx-auto text-dark bg-background shadow-dark shadow-xl'>
      <TheSidebar sidebarNav={sidebarNav} isSidebarOpen={isSidebarOpen} setOpenSidebar={setOpenSidebar} />

      <div className='relative overflow-x-hidden flex flex-col w-full pt-4 px-8 lg:pt-8 lg:px-12'>
        <TheHeader sidebarNav={sidebarNav} setOpenSidebar={setOpenSidebar} />

        <div className='w-fit mt-5 mb-20'>
          <Outlet />

          {/* DELETE */}
          <div className='flex gap-5 my-5'>
          <button onClick={signout} className='border border-danger bg-light p-4'>logout</button>
          <button onClick={testing} className='border border-danger bg-light p-4'>firestore</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Layout;
