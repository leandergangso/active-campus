import { MdExpandMore } from 'react-icons/md';

function Dropdown({ options, onChange, value, label = '' }) {
  if (value === null) {
    value = options[0];
  }

  return (
    <div className='flex flex-col gap-1 grow'>
      {label !== '' && <label>{label}</label>}
      <div className='relative max-w-xs'>
        <MdExpandMore className='absolute top-1 right-2 w-8 h-8' />
        <select value={value} onChange={onChange} className="rounded-md pl-3 w-full pr-10 py-2 bg-light border border-border appearance-none outline-none focus:border-dark">
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
