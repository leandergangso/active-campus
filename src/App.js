import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import TheLayout from './components/TheLayout';
import Events from './pages/Events';
import Organization from './pages/Organization';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

function App() {
  const routes = [
    { path: '/', component: <Events />},
    { path: '/organization', component: <Organization />},
    { path: '/users', component: <Users />},
    { path: '/settings', component: <Settings />},
    { path: '/feedback', component: <Feedback />},
  ]

  const sidebarNav = [
    { path: routes[0].path, name: 'Arrangementer', icon: <MdCalendarToday />, role: 1 },
    { path: routes[1].path, name: 'Organisasjoner', icon: <MdOutlineBusiness />, role: 1 },
    { path: routes[2].path, name: 'Brukere', icon: <MdSupervisedUserCircle />, role: 1 },
    { path: routes[3].path, name: 'Innstillinger', icon: <MdSettings />, role: 1 },
    { path: routes[4].path, name: 'Tilbakemelding', icon: <MdFeedback />, role: 1 },
  ]

  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>

        <Route path='/' element={<TheLayout sidebarNav={sidebarNav} />}>
          {routes.map(route => (
            <Route exact key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
