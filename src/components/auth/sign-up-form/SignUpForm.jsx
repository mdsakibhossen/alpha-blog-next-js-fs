"use client";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    router.push(callbackUrl);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const password = e.target[2].value.trim();
    if (!fullName || !email || !password) {
      setMessage({ text: "Please Filed All The Fileds...", isSucceed: false });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      // console.log(data, "DATA");

      if (res.ok) {
        setMessage({
          // text: data.message,
          text: "",
          isSucceed: true,
        });
        setIsLoading(false);
        router.push("/login");
      } else {
        setMessage({
          text: data.message,
          isSucceed: false,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setMessage({
        text: error.message || "Something went wrong...",
        isSucceed: false,
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="sign-up-form max-w-[600px] mx-auto">
      <div className="mb-2">
        <AlertMessage message={message} />
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter Your Name"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
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
          <button
            disabled={isLoading}
            className={`bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2.5 rounded text-white ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
