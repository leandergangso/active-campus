import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';

// ! delete
import { useAuth } from '../../contexts/AuthContext';
import { testing } from '../../helpers/firestore';
import { getOrganizations } from '../../helpers/brreg';

function Layout() {
  const [isSidebarOpen, setOpenSidebar] = useState(false);

  const sidebarNav = [
    { path: '/events', name: 'Arrangementer', icon: <MdCalendarToday /> },
    { path: '/organizations', name: 'Organisasjoner', icon: <MdOutlineBusiness /> },
    { path: '/users', name: 'Brukere', icon: <MdSupervisedUserCircle /> },
    { path: '/feedback', name: 'Tilbakemelding', icon: <MdFeedback /> },
  ];

  // ! delete
  const { signout, currentUser } = useAuth();
  const brreg = async () => {
    const res = await getOrganizations('leander gang');
    res.forEach(org => {
      console.log(org.navn, org.organisasjonsnummer);
    });
  };

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
            <button onClick={brreg} className='border border-danger bg-light p-4'>brreg</button>
            {JSON.stringify(currentUser)}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Layout;
