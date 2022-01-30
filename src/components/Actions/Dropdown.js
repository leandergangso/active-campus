import { MdExpandMore } from 'react-icons/md'

function Dropdown({ options }) {
  // let n = 23
  // options.forEach(option => {
  //   if (option.name.length > n) {
  //     option.name = option.name.substr(0, n) + '...'
  //   }
  // });

  return (
    // <div className='relative w-60'>
    <div className='relative max-w-xs'>
      <MdExpandMore className='absolute top-1 right-2 w-8 h-8' />
      <select className="rounded-full pl-3 w-full pr-10 h-10 bg-light border border-border appearance-none">
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
