import SignUpForm from "@/components/auth/sign-up-form/SignUpForm";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | AlphaBlog",
  description: "Sign Up Page",
};
const SignUpPage = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-3">
        <div className="heading flex flex-col justify-center items-center gap-2 mb-5">
          <h1 className="text-3xl">Sign Up</h1>
          <p className="text-gray-500 flex gap-1">
            <span>Already have an account?</span>
            <Link
              href={"/login"}
              className="underline text-gray-800 hover:text-green-400"
            >
              Login
            </Link>
          </p>
        </div>
        {/* Sign Up Form */}
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
