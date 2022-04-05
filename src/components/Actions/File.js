import { useState } from "react";
import { MdImage } from "react-icons/md";

const File = ({ name, label, onChange, accept }) => {
  const [file, setFile] = useState(false);

  const onFile = (e) => {
    let name = e.target.files[0].name;
    if (name.length > 20) {
      name = name.substring(0, 20) + '...';
    }
    setFile(name);
    onChange(e);
  };

  return (
    <label className="flex flex-col gap-1">
      {label}
      <div className="border border-border rounded-md bg-light px-4 py-2 text-center font-bold hover:cursor-pointer">
        {file === false
          && <span>Last opp <MdImage className="inline-block" size={20} /></span>
          || <span>{file} <MdImage className="inline-block" size={20} /></span>
        }
      </div>
      <input
        hidden
        type="file"
        name={name}
        accept={accept}
        onChange={onFile}
      />
    </label>
  );
};

export default File;