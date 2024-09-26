import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="text-2xl mt-4 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition duration-300 ease-in-out"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
