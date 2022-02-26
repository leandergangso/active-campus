import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useReducer, useState } from "react";

import TheLayout from './TheLayout';
import Events from '../../pages/Events/Index';
import Event from '../../pages/Events/Event/Index';
import ArchivedEvents from '../../pages/Events/Archived/Index';
import CreateEvent from '../../pages/Events/Create/Index';
import Organizations from '../../pages/Organization/Index';
import CreateOrganization from '../../pages/Organization/Create/Index';
import Users from '../../pages/Users/Index';
import Feedback from '../../pages/Feedback/Index';
import NotFound from '../../pages/Errors/NotFound';
import Loading from '../Loading';

const TheDashboard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, dispatch] = useReducer();

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) {
    return (
      <Loading message="Gjør klar applikasjon..." />
    );
  }

  return (
    <Routes key={location.pathname} location={location}>
      <Route index element={<Navigate to='/events' />} />

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
};

export default TheDashboard;