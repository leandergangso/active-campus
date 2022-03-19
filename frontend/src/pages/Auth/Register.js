import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/Actions/Button';
import Input from '../../components/Actions/Input';
import AuthLogin from '../../components/Actions/AuthLogin';
import logo from '../../images/logo.png';
import google from '../../images/google.png';
import facebook from '../../images/facebook.png';

const Register = () => {
  const navigate = useNavigate();
  const { signup, signinWithGoogle, signinWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const updateData = (type, newData) => {
    setData(data => {
      return { ...data, [type]: newData };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (data.password !== data.confirm_password) {
      return setError('Passord stemmer ikke.');
    }

    try {
      setError('');
      setLoading(true);
      await signup(data.name, data.email, data.password);
      navigate('/');
    }
    catch (error) {
      setLoading(false);

      if (error.code.includes('weak-password')) {
        setError('Passord er for svakt, minst 6 tegn');
      } else {
        setError('Kunne ikke opprette bruker.');
      }
    }
  };

  const handleGoogle = async () => {
    try {
      setAuthError('');
      await signinWithGoogle();
      navigate('/');
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
      navigate('/');
    }
    catch (error) {
      if (error.code.includes('account-exists')) {
        setAuthError('Konto finnes alt med annen pålogging.');
      }
    }
  };

  return (
    <div className='bg-background h-screen flex flex-col items-center px-5'>
      <img src={logo} alt="logo" className='w-50 my-10' />

      <div>
        <div className='border border-border rounded-md bg-light flex flex-col gap-5 mb-5 py-5 px-5 sm:px-14'>
          <h1 className='text-center font-bold text-2xl'>Kom i gang!</h1>

          {error && <p className='text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col gap-5 mx-2 sm:w-80'>
            <Input required onChange={(e) => updateData('name', e.target.value)} name='name' placeholder='Ditt navn' className='bg-background' />
            <Input required onChange={(e) => updateData('email', e.target.value)} name='email' type='email' placeholder='Epost' className='bg-background' />
            <Input required onChange={(e) => updateData('password', e.target.value)} type='password' placeholder='Passord' className='bg-background' />
            <Input required onChange={(e) => updateData('confirm_password', e.target.value)} type='password' placeholder='Bekreft passord' className='bg-background' />
            <Button disabled={loading}>Ny bruker</Button>
          </form>

          {loading}

          <div className='flex gap-5 self-center'>
            <span onClick={() => navigate('/login')} className='text-placeholder hover:cursor-pointer'>Har en bruker alt?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;