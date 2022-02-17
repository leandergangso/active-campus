const StatCard = ({ title, bgColor, children }) => {
  return (
    <div className="shadow-md w-full sm:w-56 2xl:w-64 rounded-b-md bg-light">
      <div className={'text-light pl-5 py-2 rounded-t-md ' + bgColor}>
        <h2>{title}</h2>
      </div>

      <div className="h-20 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default StatCard;
