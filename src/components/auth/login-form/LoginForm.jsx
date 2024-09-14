"use client";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="sign-up-form max-w-[600px] mx-auto">
      <form action="" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password: </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
            />
            <div className="icon absolute top-[50%] right-2 translate-y-[-50%]">
              <button
                type="button"
                onClick={() => setShowPass(true)}
                className={showPass ? "hidden" : "inline-block"}
              >
                <FaRegEye />
              </button>
              <button
                type="button"
                onClick={() => setShowPass(false)}
                className={showPass ? "inline-block" : "hidden"}
              >
                <FaRegEyeSlash />
              </button>
            </div>
          </div>
        </div>
        <div className="btn-box mt-3 text-center">
          <button className="bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2.5 rounded text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
