import CardWrapper from "@/components/backend/dashboard/card-wrapper/CardWrapper";
export const metadata = {
  title: "Dashboard | AlphaBlog",
  description: "Dashboard Description",
};
const DashboardPage = () => {
  return <div className="dashboard p-3 w-full">
    <CardWrapper/>
  </div>;
};

export default DashboardPage;
