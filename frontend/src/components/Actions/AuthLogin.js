const AuthLogin = ({provider, img, onClick}) => {
  return (
    <button
      onClick={onClick}
      className='w-full sm:w-60 flex justify-center border border-border rounded-md bg-light px-4 py-2 hover:cursor-pointer'
    >
      <img src={img} alt={provider} className='inline mr-4 h-6 self-center' />
      <span className="font-bold text-placeholder text-sm self-center">Logg inn med {provider}</span>
    </button>
  )
}

export default AuthLogin