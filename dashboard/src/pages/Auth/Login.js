import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/Actions/Button';
import Input from '../../components/Actions/Input';
import AuthLogin from '../../components/Actions/AuthLogin';
import logo from '../../images/logo.png';
import google from '../../images/google.png';
import facebook from '../../images/facebook.png';

const Login = () => {
  const navigate = useNavigate()
  const { signin, signinWithGoogle, signinWithFacebook } = useAuth()
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [error, setError] = useState('')
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const updateData = (type, newData) => {
    setData(data => {
      return { ...data, [type]: newData }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      await signin(data.email, data.password)
      navigate('/')
    }
    catch (error) {
      setLoading(false)

      if (error.code.includes('too-many-requests')) {
        setError('For mange forsøk, prøv igjen senere.')
      } else {
        setError('Feil epost eller passord.')
      }
    }
  }

  const handleGoogle = async () => {
    try {
      setAuthError('')
      await signinWithGoogle()
      navigate('/')
    }
    catch(error) {
      if (error.code.includes('account-exists')) {
        setAuthError('Konto finnes alt med annen pålogging.')
      }
    }
  }
  
  const handleFacebook = async () => {
    try {
      setAuthError('')
      await signinWithFacebook()
      navigate('/')
    }
    catch(error) {
      if (error.code.includes('account-exists')) {
        setAuthError('Konto finnes alt med annen pålogging.')
      }
    }
  }

  return (
    <div className='bg-background h-screen flex flex-col items-center px-5'>
      <img src={logo} alt="logo" className='w-50 my-10' />

      <div>
        <div className='border border-border rounded-md bg-light flex flex-col gap-5 mb-5 py-5 px-5 sm:px-20'>
          <h1 className='text-center font-bold text-2xl'>Hei igjen!</h1>

          {error && <p className='text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <Input required onChange={(e) => updateData('email', e.target.value)} name='email' type='email' placeholder='Epost' className='bg-background' />
            <Input required onChange={(e) => updateData('password', e.target.value)} type='password' placeholder='Passord' className='bg-background' />

            <Button disabled={loading}>Logg inn</Button>
          </form>

          <div className='flex gap-5 self-center'>
            <span onClick={() => navigate('/password/reset')} className='text-placeholder hover:cursor-pointer'>Glemt passord?</span>
            <span onClick={() => navigate('/register')} className='text-placeholder hover:cursor-pointer'>Ny bruker?</span>
          </div>
        </div>

        <div className='flex flex-wrap gap-5 justify-between select-none max-w-lg'>
          {authError && <p className='text-center w-full text-danger'>{authError}</p>}
          <AuthLogin provider='Google' img={google} onClick={handleGoogle} />
          <AuthLogin provider='Facebook' img={facebook} onClick={handleFacebook} />
        </div>
      </div>
    </div>
  )
}

export default Login