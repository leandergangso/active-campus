const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <div>
      <input
        name={name}
        id={name}
        type="checkbox"
        defaultChecked={checked ? 'checked' : ''}
        className='mr-4 border border-dark rounded-md p-2 cursor-pointer'
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className='select-none cursor-pointer'
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox