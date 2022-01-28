import { ImSpinner9 } from 'react-icons/im';

function Loading({ size }) {
  return (
    <div>
      <ImSpinner9 size={size} className='fill-primary animate-spin' />
    </div>
  );
}

export default Loading;
