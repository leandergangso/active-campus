import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IconContext } from "react-icons";

import OutsideClickWrapper from './OutsideClickWrapper'

const ShowOptions = (isOption, setIsOption, options) => {
  return (
    <div onClick={() => setIsOption(false)} className={'absolute z-40 top-11 right-0 w-40 rounded-md bg-light shadow-md border border-border ' + (isOption ? 'block' : 'hidden')}>
      {options.map(option => (
        <div onClick={option.action} key={option.name} className='flex flex-row gap-2 px-4 py-2 border-b border-border hover:cursor-pointer hover:bg-border'>
          <IconContext.Provider value={{ color: option.icon.color, size: "1.5em" }}>
            {option.icon.component}
          </IconContext.Provider>
          <div>{option.name}</div>
        </div>
      ))}
    </div>
  )
}

function Options({ options }) {
  const [isOption, setIsOption] = useState(false)

  return (
    <OutsideClickWrapper onOutsideClick={() => setIsOption(false)} >
      <div onClick={() => setIsOption(!isOption)} className='p-2 hover:cursor-pointer rounded-full border border-transparent hover:border hover:border-border'>
        <MdMoreVert className='w-6 h-6' />
      </div>
      {ShowOptions(isOption, setIsOption, options)}
    </OutsideClickWrapper>
  );
}

export default Options;
