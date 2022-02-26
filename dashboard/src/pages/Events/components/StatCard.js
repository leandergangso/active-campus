const StatCard = ({ title, className, children }) => {
  return (
    <div className="shadow-md w-full sm:w-56 rounded-b-md bg-light">
      <div className={'text-light pl-5 py-2 rounded-t-md ' + className}>
        <h2>{title}</h2>
      </div>

      <div className="h-20 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default StatCard;
