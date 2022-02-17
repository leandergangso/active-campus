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
      <label htmlFor={ name }>{label}</label>
      <input
        name={name}
        id={ name }
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        className='rounded-md w-full h-10 px-4 bg-light appearance-none border border-border focus:border-dark outline-none' />
    </div>
  )
}

export default Input