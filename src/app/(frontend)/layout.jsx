import Footer from "@/components/frontend/footer/Footer";
import Header from "@/components/frontend/header/Header";

export const metadata = {
  title: "Home | AlphaBlog",
  description: "Home Page Description",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
}
