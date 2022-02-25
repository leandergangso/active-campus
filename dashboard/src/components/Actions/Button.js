/**
 * Creates a prestyled button based on input.
 * 
 * @param style Valid input: (primary, secondary, danger)
 * @param onClick A function to call onClick
 */
function Button({ style, onClick, disabled, children }) {
  const primaryStyle = 'border-transparent text-light bg-primary'
  const secondaryStyle = 'border-dark hover:bg-dark hover:text-light'
  const dangerStyle = 'border-danger text-danger hover:bg-danger hover:text-light'

  let buttonStyle = primaryStyle
  if (style === 'secondary') {
    buttonStyle = secondaryStyle
  }
  else if (style === 'danger') {
    buttonStyle = dangerStyle
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={'text-sm py-2 rounded-md font-bold border-2 outline-none hover:cursor-pointer disabled:bg-opacity-50 disabled:cursor-wait ' + buttonStyle}
    >
      {children}
    </button>
  );
}

export default Button;
