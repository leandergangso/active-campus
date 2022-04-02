function Button({ styles, onClick, disabled, children }) {
  const primaryStyle = 'border-transparent text-light bg-primary hover:border-dark';
  const secondaryStyle = 'border-dark hover:bg-dark hover:text-light';
  const dangerStyle = 'border-danger text-danger hover:bg-danger hover:text-light';

  let buttonStyle = primaryStyle;
  if (styles === 'secondary') {
    buttonStyle = secondaryStyle;
  }
  else if (styles === 'danger') {
    buttonStyle = dangerStyle;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={'text-sm w-full py-2 rounded-md font-bold border-2 outline-none hover:cursor-pointer disabled:bg-opacity-50 disabled:cursor-wait ' + buttonStyle}
    >
      {children}
    </button>
  );
}

export default Button;
