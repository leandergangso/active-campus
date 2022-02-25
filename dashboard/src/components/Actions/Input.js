/**
 * Create input and label with given input.
 * 
 * @param placeholder
 * @param name
 * @param type
 * @param defaultValue
 * @param className
 * @param onChange
 */
const Input = ({ placeholder, name, defaultValue, onChange, required, type = "text", className = "" }) => {
  return (
    <div className="flex flex-col gap-1 grow">
      <input
        onChange={onChange}
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={'rounded-md py-2 px-4 bg-light appearance-none border border-border outline-none focus:border-dark ' + className} />
    </div>
  )
}

export default Input