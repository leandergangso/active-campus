const Input = ({ placeholder, name, value, defaultValue, min, max, disabled, onChange, required, label, className, type = "text" }) => {
  return (
    <label className="flex flex-col gap-1 grow">
      {label}
      <input
        onChange={onChange}
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        defaultValue={defaultValue}
        disabled={disabled}
        className={className + ' rounded-md w-full py-2 px-4 appearance-none border border-border outline-none disabled:cursor-default focus:border-dark'}
      />
    </label>
  );
};

export default Input;