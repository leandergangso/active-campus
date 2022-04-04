import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAppState } from 'contexts/AppContext';
import { MdManageSearch, MdOutlineBusiness, MdSupervisedUserCircle, MdOutlineEvent, MdAccountCircle, MdEventNote } from 'react-icons/md';

import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';

function Layout() {
  const { state } = useAppState();
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  let sidebarNav = [
    { id: 0, path: '/events', name: 'Utforsk', icon: <MdManageSearch /> },
    { id: 1, path: '/events/signed-up', name: 'Mine arrangementer', icon: <MdOutlineEvent /> },
    { id: 2, path: '/profile', name: 'Min side', icon: <MdAccountCircle /> },

    { id: 3, path: '/organizations', name: 'Organisasjoner', icon: <MdOutlineBusiness />, split: true },
    { id: 4, path: '/organizations/events', name: 'Arrangementer', icon: <MdEventNote /> },
    { id: 5, path: '/organizations/users', name: 'Brukere', icon: <MdSupervisedUserCircle /> },
  ];

  if (state.organizations.length === 0) {
    sidebarNav = sidebarNav.filter(item => {
      return ![4, 5].includes(item.id);
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
