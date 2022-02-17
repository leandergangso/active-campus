import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import TheLayout from './components/Singelton/TheLayout';
import Events from './pages/Events/Index';
import Event from './pages/Events/Event/Index';
import ArchivedEvents from './pages/Events/Archived/Index';
import CreateEvent from './pages/Events/Create/Index';
import Organizations from './pages/Organization/Index';
import CreateOrganization from './pages/Organization/Create/Index';
import Users from './pages/Users/Index';
import Feedback from './pages/Feedback/Index';
import NotFound from './pages/NotFound/Index';
import Settings from './pages/Settings/Index';
import Profile from './pages/Profile/Index';

function App() {
  const location = useLocation()

  return (
      <Routes key={location.pathname} location={location}>
        <Route exact index element={<Navigate to='/events' />} />

        <Route exact path='/' element={<TheLayout />}>
          <Route exact path='/events' element={<Events />} />
          <Route exact path='/events/event' element={<Event />} />
          <Route exact path='/events/create' element={<CreateEvent />} />
          <Route exact path='/events/archived' element={<ArchivedEvents />} />

          <Route exact path='/organizations' element={<Organizations />} />
          <Route exact path='/organizations/create' element={<CreateOrganization />} />

          <Route exact path='/users' element={<Users />} />
          <Route exact path='/feedback' element={<Feedback />} />
          {/* <Route exact path='/settings' element={<Settings />} /> */}
          {/* <Route exact path='/profile' element={<Profile />} /> */}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
  );
}

export default App;
