import UserList from "@/components/backend/user-list/UserList";
export const metadata = {
  title: "Users | AlphaBlog",
  description: "Users Description",
};
const UserListPage = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Users</h1>
        </div>
        <UserList />
      </div>
    </section>
  );
};

export default UserListPage;
