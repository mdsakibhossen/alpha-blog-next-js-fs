import Header from "@/components/auth/header/Header";

export const metadata = {
  title: "Auth | AlphaBlog",
  description: "Login & Sign Up Pages",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
