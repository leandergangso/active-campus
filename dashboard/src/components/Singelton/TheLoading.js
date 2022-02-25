import { ImSpinner9 } from 'react-icons/im';

function Loading() {
  return (
    <div className='flex flex-col gap-10 px-10'>
      <ImSpinner9 size='80' className='fill-primary animate-spin self-center' />
      <h1 className='text-2xl font-bold text-center text-placeholder'>LASTER INN...</h1>
    </div>
  );
}

export default Loading;
