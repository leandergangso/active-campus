const File = ({ name, label, onChange, accept }) => {
  return (
    <label className="flex flex-col gap-1">
      {label}
      <div className="border border-border rounded-md bg-light px-4 py-2 text-center font-bold hover:cursor-pointer">
        Last opp 📂
      </div>
      <input
        hidden
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
      />
    </label>
  );
};

export default File;