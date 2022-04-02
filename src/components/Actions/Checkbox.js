const Checkbox = ({ name, label, checked, onChange, required }) => {
  return (
    <label className='select-none cursor-pointer'>
      <input
        name={name}
        required={required}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className='mr-4 cursor-pointer'
      />
      {label}
    </label>
  );
};

export default Checkbox;