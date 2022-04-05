import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';

import Login from './pages/Auth/Login';
import LoginWithEmail from './pages/Auth/LoginWithEmail';
import Reset from './pages/Auth/Reset';
import Register from './pages/Auth/Register';
import TheDashboard from './components/Singelton/TheDashboard';
import NotFound from 'pages/Errors/NotFound';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();

  // authentication
  if (!currentUser) {
    return (
      <Routes key={location.pathname} location={location}>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/login/email' element={<LoginWithEmail />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/password/reset' element={<Reset />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <AppProvider>
      <TheDashboard />
    </AppProvider>
  );
}

export default App;
