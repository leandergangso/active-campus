const StatCard = ({ title, bgColor, children }) => {
  return (
    <div className="flex-col grow max-w-xs w-60 shadow-sm">
      <div className={'text-light pl-5 py-4 rounded-t-md ' + bgColor}>
        <h2>{title}</h2>
      </div>

      <div className="bg-light h-28 rounded-b-md flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default StatCard;
