import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import PageTransition from './PageTransition';
import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';
import Loading from './Loading';

function Layout({ sidebarNav }) {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  return (
    <div className='flex w-screen max-w-[1920px] mx-auto h-screen bg-background shadow-dark drop-shadow-xl'>
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
