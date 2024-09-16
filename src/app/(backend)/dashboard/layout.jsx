import Header from "@/components/backend/header/Header";
import Sidebar from "@/components/backend/sidebar/Sidebar";

export const metadata = {
  title: "Dashboard | AlphaBlog",
  description: "Dashboard Description",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex min-h-[85vh]">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
