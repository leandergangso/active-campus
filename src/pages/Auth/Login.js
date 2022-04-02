import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import AuthLogin from '../../components/Actions/AuthLogin';
import logo from '../../images/logo.png';
import google from '../../images/google.png';
import facebook from '../../images/facebook.png';

const Login = () => {
  const navigate = useNavigate();
  const { signinWithGoogle, signinWithFacebook } = useAuth();
  const [authError, setAuthError] = useState('');

  const handleGoogle = async () => {
    try {
      setAuthError('');
      await signinWithGoogle();
    }
    catch (error) {
      if (error.code.includes('account-exists')) {
        setAuthError('Konto finnes alt med annen pålogging.');
      }
    }
  };

  const handleFacebook = async () => {
    try {
      setAuthError('');
      await signinWithFacebook();
    }
    catch (error) {
      if (error.code.includes('account-exists')) {
        setAuthError('Konto finnes alt med annen pålogging.');
      }
    }
  };

  return (
    <div className='bg-background h-screen flex flex-col items-center'>
      <img src={logo} alt="logo" className='w-50 my-10' />

      <div className='bg-light border border-border rounded-md py-5 px-5 sm:px-14'>
        <h1 className='text-center font-bold text-2xl mb-5'>Hei igjen!</h1>

        <div className='flex flex-col gap-5 select-none mx-2 sm:w-80'>
          {authError && <p className='text-center w-full text-danger'>{authError}</p>}
          <AuthLogin provider='Facebook' img={facebook} onClick={handleFacebook} />
          <AuthLogin provider='Google' img={google} onClick={handleGoogle} />

          <div className='relative border-b border-border my-2'>
            <span className='absolute -top-5 left-1/2 -translate-x-1/2 text-placeholder bg-light p-2'>eller</span>
          </div>

          <Link
            to='/login/email'
            className='text-center border border-border bg-background py-2 rounded-md hover:bg-dark hover:text-light'
          >
            Logg inn med email
          </Link>

          <div className='flex gap-5 self-center'>
            <span onClick={() => navigate('/register')} className='text-placeholder hover:cursor-pointer'>Ny bruker?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;