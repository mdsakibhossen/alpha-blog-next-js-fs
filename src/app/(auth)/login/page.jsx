import LoginForm from "@/components/auth/login-form/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login | AlphaBlog",
  description: "Login Page",
};
const LoginPage = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-3">
        <div className="heading flex flex-col justify-center items-center gap-2 mb-5">
          <h1 className="text-3xl">Login</h1>
          <p className="text-gray-500 flex gap-1">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/sign-up"}
              className="underline text-gray-800 hover:text-green-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
        {/* Login Form */}
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
