import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Login from './pages/Auth/Login';
import Reset from './pages/Auth/Reset';
import Register from './pages/Auth/Register';
import TheLayout from './components/Singelton/TheLayout';
import Events from './pages/Events/Index';
import Event from './pages/Events/Event/Index';
import ArchivedEvents from './pages/Events/Archived/Index';
import CreateEvent from './pages/Events/Create/Index';
import Organizations from './pages/Organization/Index';
import CreateOrganization from './pages/Organization/Create/Index';
import Users from './pages/Users/Index';
import Feedback from './pages/Feedback/Index';
import NotFound from './pages/Errors/NotFound';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();

  // authentication
  if (!currentUser) {
    return (
      <Routes key={location.pathname} location={location}>
        <Route path='*' element={<Navigate to='/login' />} />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/password/reset' element={<Reset />} />
      </Routes>
    );
  }

  // application
  return (
    <Routes key={location.pathname} location={location}>
      <Route index element={<Navigate to='/events' />} />

      {/* tip: add PrivateRoutes if needed */}

      <Route exact path='/' element={<TheLayout />}>
        <Route exact path='/events' element={<Events />} />
        <Route exact path='/events/event' element={<Event />} />k
        <Route exact path='/events/create' element={<CreateEvent />} />
        <Route exact path='/events/archived' element={<ArchivedEvents />} />

        <Route exact path='/organizations' element={<Organizations />} />
        <Route exact path='/organizations/create' element={<CreateOrganization />} />

        <Route exact path='/users' element={<Users />} />
        <Route exact path='/feedback' element={<Feedback />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
