import { ImSpinner9 } from 'react-icons/im';
import logo from '../images/logo.png';

function Loading({ message = 'laster inn...' }) {
  message = message.toUpperCase();

  return (
    <div className='bg-background flex flex-col gap-5 justify-center items-center h-screen pb-40 px-5'>
      <img src={logo} alt="logo" />
      <div className='w-full sm:w-96 border border-border mt-5 py-10 rounded-md bg-light'>
        <div className='flex flex-col gap-10 px-10'>
          <ImSpinner9 size='80' className='fill-primary animate-spin self-center' />
          <h1 className='text-xl font-bold text-center text-placeholder'>{message}</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
