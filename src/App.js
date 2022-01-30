import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'

import TheLayout from './components/TheLayout';
import Events from './pages/Events';
import CreateEvent from './pages/Events/Create';
import Organization from './pages/Organization';
import CreateOrganization from './pages/Organization/Create';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

function App() {
  // list of all available roues - others will be 404
  const routes = [
    { path: '/', component: <Events />},
    { path: '/create', component: <CreateEvent />},
    { path: '/organization', component: <Organization />},
    { path: '/organization/create', component: <CreateOrganization />},
    { path: '/users', component: <Users />},
    { path: '/settings', component: <Settings />},
    { path: '/feedback', component: <Feedback />},
  ]

  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<TheLayout />}>
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
