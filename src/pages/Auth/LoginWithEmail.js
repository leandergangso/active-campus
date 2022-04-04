import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';

import Button from 'components/Actions/Button';
import Input from 'components/Actions/Input';
import logo from 'images/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const updateData = (type, newData) => {
    setData(data => {
      return { ...data, [type]: newData };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await signin(data.email, data.password);
    }
    catch (error) {
      setLoading(false);

      if (error.code.includes('too-many-requests')) {
        setError('For mange forsøk, prøv igjen senere.');
      } else {
        setError('Feil epost eller passord.');
      }
    }
  };

  return (
    <div className='bg-background h-screen flex flex-col items-center px-5'>
      <img src={logo} alt="logo" className='w-50 my-10' />

      <div>
        <div className='border border-border rounded-md bg-light flex flex-col gap-5 mb-5 py-5 px-5 sm:px-14'>
          <h1 className='text-center font-bold text-2xl'>Hei igjen!</h1>

          {error && <p className='text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col gap-5 mx-2 sm:w-80'>
            <Input required onChange={(e) => updateData('email', e.target.value)} name='email' type='email' placeholder='Epost' className='bg-background' />
            <Input required onChange={(e) => updateData('password', e.target.value)} type='password' placeholder='Passord' className='bg-background' />

            <Button disabled={loading}>Logg inn</Button>
          </form>

          <div className='flex gap-5 self-center'>
            <span onClick={() => navigate('/password/reset')} className='text-placeholder hover:cursor-pointer'>Glemt passord?</span>
            <span onClick={() => navigate('/register')} className='text-placeholder hover:cursor-pointer'>Ny bruker?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;