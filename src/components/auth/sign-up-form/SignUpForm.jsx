
const SignUpForm = () => {
  return (
    <div className="sign-up-form max-w-[600px] mx-auto">
      <form action="" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter Your Name"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 px-1 py-1.5 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 px-1 py-1.5 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 px-1 py-1.5 rounded"
          />
        </div>
        <div className="btn-box mt-3 text-center">
          <button className="bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2 rounded text-white">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm