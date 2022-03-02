const Checkbox = ({ name, label, checked, onChange, required, className }) => {
  return (
    <div>
      <input
        name={name}
        id={name}
        required={required}
        type="checkbox"
        checked={checked}
        className={`mr-4 border border-dark rounded-md p-2 cursor-pointer ${className}`}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className='select-none cursor-pointer'
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;