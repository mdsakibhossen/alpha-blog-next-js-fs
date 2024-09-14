const AlertMessage = ({ message }) => {
  const { text, isSucceed } = message;

  return (
    <div
      className={`px-3 py-2 rounded ${
        isSucceed ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"
      } ${text ? "block" : "hidden"}`}
    >
      {text}
    </div>
  );
};

export default AlertMessage;
