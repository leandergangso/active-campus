import { MdRemoveCircle, MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md'

import Checkbox from "../../../components/Actions/Checkbox";
import Dropdown from "../../../components/Actions/Dropdown";
import Input from "../../../components/Actions/Input";

const FormCard = ({ name, type, required }) => {
  const options = [
    'Tekst',
    'Lang tekst',
    'Flervalg',
    'Enkelvalg',
  ]

  return (
    <div className="relative bg-background rounded-md shrink-0 grow w-full px-4 py-4 border-2 border-border">
      <div className='flex flex-wrap gap-5'>
        <Input name={name} placeholder={name} />
        <Dropdown options={options} />
        <div className='pl-5'>
          <MdRemoveCircle className="fill-danger w-8 h-8 hover:cursor-pointer" />
        </div>
      </div>

      <div className='flex justify-end gap-5'>
        <div className='w-full self-center h-full'>

          {type === 'select' && <Select />}
          {type === 'radio' && <Radio />}

          <div className='mt-10'>
            <Checkbox
              name={name}
              label="Obligatorisk"
              checked={required}
            />
          </div>
        </div>

        <div className='pl-5'>
          <MdArrowUpward className="fill-dark w-8 h-8 hover:cursor-pointer" />
          <MdArrowDownward className="fill-border w-8 h-8 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

const Select = () => {
  return (
    <div className='relative rounded-md bg-light border-2 border-border my-4'>
      <div className='absolute right-4 -bottom-8 rounded-b-md bg-light text-secondary text-sm font-bold px-6 py-1 border-2 border-border hover:cursor-pointer'>
        Legg til
      </div>

      <div className='relative px-4 py-2 border-b border-border'>
        <div className='flex'>
          <Checkbox name="Valg 1" />
          <input
            className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
            type="text"
            placeholder='Valg 1'
          />
        </div>
        <MdDelete className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
      </div>

      <div className='relative px-4 py-2 border-b border-border'>
        <div className='flex'>
          <Checkbox name="Valg 2" />
          <input
            className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
            type="text"
            placeholder='Valg 2'
          />
        </div>
        <MdDelete className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
      </div>

    </div>
  )
}

const Radio = () => {
  return (
    <div className='relative rounded-md bg-light border-2 border-border my-4'>
      <div className='absolute right-4 -bottom-8 rounded-b-md bg-light text-secondary text-sm font-bold px-6 py-1 border-2 border-border hover:cursor-pointer'>
        Legg til
      </div>

      <div className='relative px-4 py-2 border-b border-border'>
        <div className='flex'>
          <input type="radio" name="valg" className='mr-4' />
          <input
            className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
            type="text"
            placeholder='Valg 1'
          />
        </div>
        <MdDelete className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
      </div>

      <div className='relative px-4 py-2 border-b border-border'>
        <div className='flex'>
          <input type="radio" name="valg" className='mr-4' />
          <input
            className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
            type="text"
            placeholder='Valg 2'
          />
        </div>
        <MdDelete className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
      </div>

    </div>
  )
}

export default FormCard
