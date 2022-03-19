import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAppState } from "../../contexts/AppContext";

import TheLayout from './TheLayout';
import Events from '../../pages/Events/Index';
import Event from '../../pages/Events/Event/Index';
import CreateEvent from '../../pages/Events/Create/Index';
import Organizations from '../../pages/Organization/Index';
import CreateOrganization from '../../pages/Organization/Create/Index';
import Users from '../../pages/Users/Index';
import Feedback from '../../pages/Feedback/Index';
import NotFound from '../../pages/Errors/NotFound';

const TheDashboard = () => {
  const location = useLocation();
  const { state } = useAppState();

  return (
    <Routes key={location.pathname} location={location}>
      {state.organizations.length > 0
        ? <Route index element={<Navigate to='/events' />} />
        : <Route index element={<Navigate to='/organizations/create' />} />
      }

      <Route exact path='/' element={<TheLayout />}>
        <Route exact path='/events' element={<Events />} />
        <Route exact path='/events/:id' element={<Event />} />
        <Route exact path='/events/create' element={<CreateEvent />} />

        <Route exact path='/organizations' element={<Organizations />} />
        <Route exact path='/organizations/create' element={<CreateOrganization />} />

        <Route exact path='/users' element={<Users />} />
        <Route exact path='/feedback' element={<Feedback />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default TheDashboard;