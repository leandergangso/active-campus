import { MdMoreVert } from 'react-icons/md'

import Options from './Options'

const renderMore = () => {
  return (
    <div className='cursor-pointer absolute top-4 right-5'>
      <MdMoreVert className='w-6 h-6' />
    </div>
  )
}

function InfoCard({ more, children }) {
  return (
    <div className="bg-light relative rounded-md shadow-sm pl-5 py-4 pr-6">
      {more === true ? renderMore() : null}
      {children}
    </div>
  );
};

export default InfoCard;
