import { MdExpandMore } from 'react-icons/md'

function Dropdown({ options, label = '' }) {
  return (
    <div className='flex flex-col gap-1 grow'>
      {label !== '' && <label className='ml-4 gap-2'>{label}</label>}
      <div className='relative max-w-xs'>
        <MdExpandMore className='absolute top-1 right-2 w-8 h-8' />
        <select className="rounded-full pl-3 w-full pr-10 h-10 bg-light border border-border appearance-none outline-none focus:border-dark">
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
