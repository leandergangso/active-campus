import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import TheLayout from './components/Singelton/TheLayout';
import Events from './pages/Events/Index';
import CreateEvent from './pages/Events/Create/Index';
import Organization from './pages/Organization/Index';
import CreateOrganization from './pages/Organization/Create/Index';
import Users from './pages/Users/Index';
import Settings from './pages/Settings/Index';
import Feedback from './pages/Feedback/Index';
import Profile from './pages/Profile/Index';
import NotFound from './pages/NotFound/Index';

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
      <Routes key={location.pathname} location={location}>
        <Route exact path='/' element={<Navigate to='/events' />} />
        <Route exact path='/' element={<TheLayout />}>
          {routes.map(route => (
            <Route exact key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
  );
}

export default App;
