import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

import Layout from './Layout';
import Events from './pages/Events';
import Organization from './pages/Organization';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

function App() {
  const routes = [
    { 'path': '/', 'component': <Events />, 'name': 'Arrangementer', 'icon': <MdCalendarToday />, 'role': 1 },
    { 'path': '/organization', 'component': <Organization />, 'name': 'Organisasjoner', 'icon': <MdOutlineBusiness />, 'role': 1 },
    { 'path': '/users', 'component': <Users />, 'name': 'Brukere', 'icon': <MdSupervisedUserCircle />, 'role': 1 },
    { 'path': '/settings', 'component': <Settings />, 'name': 'Innstillinger', 'icon': <MdSettings />, 'role': 1 },
    { 'path': '/feedback', 'component': <Feedback />, 'name': 'Tilbakemelding', 'icon': <MdFeedback />, 'role': 1 },
  ]

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout routes={routes} />}>
          {routes.map(route => (
            <Route exact key={route.name} path={route.path} element={route.component} />
          ))}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
