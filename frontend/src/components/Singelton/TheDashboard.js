import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import TheLayout from './TheLayout';
import ParticipantEvents from 'pages/Participant/Index';
import Organizations from 'pages/Organization/Index';
import CreateOrganization from 'pages/Organization/Create/Index';
import OrganizationEvents from 'pages/Organization/Events/Index';
import OrganizationEvent from 'pages/Organization/Events/Event/Index';
import QRScanner from "pages/Organization/Events/Event/QRScanner";
import CreateEvent from 'pages/Organization/Events/Create/Index';
import Users from 'pages/Users/Index';
import Feedback from 'pages/Feedback/Index';
import NotFound from 'pages/Errors/NotFound';

const TheDashboard = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route index element={<Navigate to='/events' />} />

      <Route exact path='/' element={<TheLayout />}>
        <Route exact path='/events' element={<ParticipantEvents />} />
        {/* <Route exact path='/events/:id' element={<ParticipantEvent />} /> */}
        <Route exact path='/events/history' element={<ParticipantEvents />} />
        <Route exact path='/events/explore' element={<ParticipantEvents />} />

        <Route exact path='/organizations' element={<Organizations />} />
        <Route exact path='/organizations/create' element={<CreateOrganization />} />
        <Route exact path='/organizations/:name/events' element={<OrganizationEvents />} />
        <Route exact path='/organizations/:name/events/:id' element={<OrganizationEvent />} />
        <Route exact path='/organizations/:name/events/create' element={<CreateEvent />} />
        <Route exact path='/organizations/:name/events/scanner' element={<QRScanner />} />

        <Route exact path='/users' element={<Users />} />
        <Route exact path='/feedback' element={<Feedback />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default TheDashboard;