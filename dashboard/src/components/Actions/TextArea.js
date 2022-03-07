const TextArea = ({ name, label, value, onChange, spellCheck = false, rows = '8' }) => {
  return (
    <label className="flex flex-col gap-1">
      {label}
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        spellCheck={spellCheck}
        className="border border-border outline-none rounded-md p-2 resize-none focus:border-dark">
      </textarea>
    </label>
  );
};

export default TextArea;