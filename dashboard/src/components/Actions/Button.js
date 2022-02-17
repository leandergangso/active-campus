/**
 * Creates a prestyled button based on input.
 * 
 * @param text Text inside button
 * @param style Valid input: (primary, secondary, danger)
 * @param onClick A function to call onClick
 */
function Button({ text, style, onClick }) {
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
      className={'text-sm max-w-xs w-full sm:w-40 h-10 rounded-md font-bold border-2 outline-none hover:cursor-pointer ' + buttonStyle}
    >
      {text}
    </button>
  );
}

export default Button;
