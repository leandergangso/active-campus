import Sidebar from './components/Sidebar';
import { MdCalendarToday, MdOutlineBusiness, MdSupervisedUserCircle, MdSettings, MdFeedback } from 'react-icons/md';

function App() {
  const routes = [
    { 'route': 'Arrangementer',   'name': 'Arrangementer',  'icon': <MdCalendarToday />,        'role': 1 },
    { 'route': 'Organisasjoner',  'name': 'Organisasjoner', 'icon': <MdOutlineBusiness />,      'role': 1 },
    { 'route': 'Brukere',         'name': 'Brukere',        'icon': <MdSupervisedUserCircle />, 'role': 1 },
    { 'route': 'Innstillinger',   'name': 'Innstillinger',  'icon': <MdSettings />,             'role': 1 },
    { 'route': 'Tilbakemelding',  'name': 'Tilbakemelding', 'icon': <MdFeedback />,             'role': 1 },
  ]

  return (
    <div className="App">
      <Sidebar routes={routes} />
    </div>
  );
}

export default App;
