import { useState } from 'react';
import { IconContext } from "react-icons";

const OptionWrapper = ({ options, children }) => {
  const [isOption, setIsOption] = useState(false);

  return (
    <div
      onClick={() => setIsOption(!isOption)}
      onMouseEnter={() => setIsOption(true)}
      onMouseLeave={() => setIsOption(false)}
      className='relative pb-2 px-1'
    >
      {children}
      {isOption && <Options options={options} />}
    </div>
  );
};

const Options = ({ options }) => {
  return (
    <div className='absolute right-0 mb-10 w-56 rounded-md border border-border shadow-md bg-light'>
      {options.map(option => (
        option.onClick ? (
          <div
            key={option.name}
            onClick={option.onClick}
            className='flex gap-2 px-4 py-2 border-b border-border hover:cursor-pointer hover:bg-border'
          >
            <IconContext.Provider value={{ className: "self-center w-5 h-5 fill-danger" }}>
              {option.component}
            </IconContext.Provider>
            <p>{option.name}</p>
          </div>
        ) : (
          <div
            key={option.name}
            className='flex gap-2 px-4 py-2 border-b border-dark'
          >
            <IconContext.Provider value={{ className: "self-center w-5 h-5 fill-danger" }}>
              {option.component}
            </IconContext.Provider>
            <p>{option.name}</p>
          </div>
        )
      ))}
    </div>
  );
};

export default OptionWrapper;
