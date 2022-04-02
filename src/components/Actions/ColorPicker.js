import { useState } from 'react'
import { MdColorLens } from 'react-icons/md'

function ColorPicker({ name }) {
  const [color, setColor] = useState('#ffffff')

  const updateColor = (e) => {
    setColor(e.target.value)
  }

  const contrastCheck = () => {
    if (color >= '#ef') {
      return true
    }
    return false
  }

  return (
    <div>
      <label className='flex gap-3 border border-border bg-light rounded-full px-4 py-2 w-40 justify-between hover:cursor-pointer'>
        {color}
        <div className={`self-center rounded-full  ${contrastCheck() ? 'bg-dark' : ''}`}>
          <MdColorLens color={color} className='w-7 h-6' />
        </div>
        <input hidden value={color} onChange={updateColor} type="color" />
      </label>

    </div>
  )
}

export default ColorPicker