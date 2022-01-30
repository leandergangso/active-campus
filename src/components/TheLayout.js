import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import PageTransition from './PageTransition';
import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';
import Loading from './Loading';

function Layout() {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  const sidebarNav = [
    { path: '/', name: 'Arrangementer', icon: <MdCalendarToday />, role: 1 },
    { path: '/organization', name: 'Organisasjoner', icon: <MdOutlineBusiness />, role: 1 },
    { path: '/users', name: 'Brukere', icon: <MdSupervisedUserCircle />, role: 1 },
    { path: '/settings', name: 'Innstillinger', icon: <MdSettings />, role: 1 },
    { path: '/feedback', name: 'Tilbakemelding', icon: <MdFeedback />, role: 1 },
  ]

  return (
    <div className='flex w-screen max-w-[1920px] mx-auto h-screen text-dark bg-background shadow-dark shadow-xl'>
      <TheSidebar sidebarNav={sidebarNav} isSidebarOpen={isSidebarOpen} setOpenSidebar={setOpenSidebar} />

      <div className='relative overflow-x-hidden flex flex-col w-full pt-4 px-8 md:pt-8 md:px-12'>
        <TheHeader sidebarNav={sidebarNav} setOpenSidebar={setOpenSidebar} />

        {/* <Loading size={100} /> */}

        <PageTransition>
          <div className='mt-5'>
            <Outlet />
          </div>
        </PageTransition>
      </div>
    </div>
  );
}

export default Layout;
