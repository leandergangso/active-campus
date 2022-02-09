/**
 * Create input and label with given input.
 * 
 * @param name
 * @param placeholder
 * @param type
 * @param label
 * @param value default = "" 
 */
const Input = ({ name, placeholder, label, type = 'text', value = "" }) => {
  return (
    <div className="flex flex-col gap-1 grow">
      <label className="ml-4" htmlFor={'input' + { name }}>{label}</label>
      <input name={name} id={'input' + { name }} placeholder={placeholder} type={type} defaultValue={value} className='rounded-full w-full py-2 px-4 bg-light appearance-none border border-border focus:border-dark outline-none' />
    </div>
  )
}

export default Input