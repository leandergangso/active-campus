import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'

import TheLayout from './components/TheLayout';
import Events from './pages/Events';
import CreateEvent from './pages/Events/Create';
import Organization from './pages/Organization';
import CreateOrganization from './pages/Organization/Create';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const routes = [
    { path: '/events', component: <Events /> },
    { path: '/events/create', component: <CreateEvent /> },
    { path: '/organizations', component: <Organization /> },
    { path: '/organizations/create', component: <CreateOrganization /> },
    { path: '/users', component: <Users /> },
    { path: '/settings', component: <Settings /> },
    { path: '/feedback', component: <Feedback /> },
    { path: '/profile', component: <Profile /> },
  ]

  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route exact path='/' element={<Navigate to='/events' />} />
        <Route exact path='/' element={<TheLayout />}>
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
