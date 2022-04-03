import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAppState } from 'contexts/AppContext';
import { MdManageSearch, MdOutlineBusiness, MdSupervisedUserCircle, MdOutlineEvent } from 'react-icons/md';

import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';

function Layout() {
  const { state } = useAppState();
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  let sidebarNav = [
    { path: '/explore', name: 'Utforsk', icon: <MdManageSearch /> },
    { path: '/events/signed-up', name: 'Mine arrangementer', icon: <MdOutlineEvent /> },
    { path: '/organizations', name: 'Organisasjoner', icon: <MdOutlineBusiness /> },
    { path: '/users', name: 'Brukere', icon: <MdSupervisedUserCircle /> },
    // { path: '/feedback', name: 'Tilbakemelding', icon: <MdFeedback /> },
  ];

  if (state.organizations.length === 0) {
    sidebarNav = sidebarNav.filter(item => {
      return !['/users'].includes(item.path);
    });
  }

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
