const AuthLogin = ({ provider, img, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex justify-center border border-border rounded-md bg-background px-4 py-2 hover:bg-dark hover:text-light hover:cursor-pointer'
    >
      <img src={img} alt={provider} className='inline mr-4 h-6 self-center' />
      <span className="font-bold text-sm self-center">Logg inn med {provider}</span>
    </button>
  );
};

export default AuthLogin;