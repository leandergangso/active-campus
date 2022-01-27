import { Outlet } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import TheSidebar from './components/TheSidebar';
import TheHeader from './components/TheHeader';
import { useState } from 'react';

function Layout({ routes }) {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  return (
    <div className='flex w-screen h-screen'>
      <TheSidebar routes={routes} isSidebarOpen={isSidebarOpen} setOpenSidebar={setOpenSidebar} />

      {/* <div className='border-2  ml-20 md:ml-60'> */}
      <div className='relative overflow-x-hidden flex flex-col w-full mt-4 mx-8 md:mt-8 md:mx-12'>
        <div className=''>
          <TheHeader routes={routes} setOpenSidebar={setOpenSidebar} />
        </div>

        <PageTransition>
          <div className=''>
            <Outlet />
          </div>
        </PageTransition>
      </div>
    </div>
  );
}

export default Layout;
