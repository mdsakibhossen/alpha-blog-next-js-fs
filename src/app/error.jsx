"use client";

// import { useEffect } from "react";

const Error = ({ error, reset }) => {
  // useEffect(() => {
  //     console.error(error);
  // }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-8">
          Something went wrong while rendering this page.
        </p>
        <button
          onClick={() => reset()} // Reset the error boundary when clicking
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
