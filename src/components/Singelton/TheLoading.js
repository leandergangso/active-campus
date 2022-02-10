import { ImSpinner9 } from 'react-icons/im';

function Loading({ size }) {
  return (
    <div className='flex flex-col gap-10'>
      <ImSpinner9 size={size} className='fill-primary animate-spin self-center' />
      <h1 className='text-4xl font-bold text-center'>Laster inn</h1>
    </div>
  );
}

export default Loading;
