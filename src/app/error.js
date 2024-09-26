"use client";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Something went wrong!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    We're experiencing some technical difficulties. Please try again
                    later or contact support.
                </p>
                <Link
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;