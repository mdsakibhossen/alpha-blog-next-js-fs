const Card = ({ title, number, colorClass = "" }) => {
  return (
    <div
      className={`border-2 max-w-[400px] flex justify-center items-center p-10 flex-col gap-4 rounded ${colorClass}`}
    >
      <h2 className=" text-4xl font-medium">{number}</h2>
      <h4 className="font-medium uppercase">{title}</h4>
    </div>
  );
};

export default Card;
