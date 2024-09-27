const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="loading-spinner relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
