import { ImSpinner9 } from 'react-icons/im';

function Loading({ size }) {
  return (
    <>
      <ImSpinner9 size={size} className='fill-primary animate-spin' />
    </>
  );
}

export default Loading;
