import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/Actions/Button';
import Input from '../../components/Actions/Input';
import logo from '../../images/logo.png';

const Reset = () => {
  const navigate = useNavigate()
  const { sendPasswordLink } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      await sendPasswordLink(email)
      setMessage('Sjekk mail for reset link.')
    }
    catch (error) {
      setError('Fikk ikke sent mailen.')
    }

    setLoading(false)
  }

  return (
    <div className='bg-background h-screen flex flex-col items-center px-5'>
      <img src={logo} alt="logo" className='w-50 my-10' />

      <div>
        <div className='border border-border rounded-md bg-light flex flex-col gap-5 py-5 px-5 sm:px-20'>
          <h1 className='text-center font-bold text-2xl'>Glemt passord?</h1>

          {message && <p className='text-center text-primary'>{message}</p>}
          {error && <p className='text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <Input required onChange={(e) => setEmail(e.target.value)} name='email' type='email' placeholder='Epost' className='bg-background sm:w-80' />
            <Button disabled={loading}>Send</Button>
          </form>

          <div className='flex gap-5 self-center'>
            <span onClick={() => navigate('/login')} className='text-placeholder hover:cursor-pointer'>Logg inn igjen?</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reset