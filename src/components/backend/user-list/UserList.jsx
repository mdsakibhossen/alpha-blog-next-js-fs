"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/services/user/userApi";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useEffect, useState } from "react";
import { useCloudinary } from "@/hooks/useCloudinary";
import UserItem from "./user-item/UserItem";

const UserList = () => {
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const { removeImage } = useCloudinary();
  const {
    data: users = [],
    isLoading,
    error,
  } = useGetAllUsersQuery();
    // console.log(users,"Users");
  const [
    deleteUser,
    {
      data: deleteMessage,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleting,
      error: deleteError,
      isError: isDeleteError,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (isDeleting) {
      setMessage({
        text: "Deleting...",
        isSucceed: true,
      });
    }
    if (isDeleteSuccess) {
      setMessage({
        text: deleteMessage?.message || "User deleted successfully.",
        isSucceed: true,
      });
    } else if (isDeleteError) {
      setMessage({
        text: deleteError?.data?.message || "Failed To Delete.",
        isSucceed: false,
      });
    }
  }, [isDeleting, isDeleteSuccess, isDeleteError]);

  const handleDeleteUser = async (id, public_id) => {
    removeImage(public_id);
    await deleteUser(id);
  };

  return (
    <div>
      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something Went Wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : users.length >= 1 ? (
        <div className="table-wrapper max-w-[1000px] mx-auto mt-3 overflow-x-auto pb-2">
          <AlertMessage message={message} />
          <table className="border border-collapse text-center w-full mt-3 min-w-[600px]">
            <thead>
              <tr className="bg-slate-500 text-white uppercase">
                <th className="border font-medium p-2">Full Name</th>
                <th className="border font-medium p-2">Email</th>
                <th className="border font-medium p-2">Image</th>
                <th className="border font-medium p-2">Admin</th>
                <th className="border font-medium p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handleDeleteUser={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-2xl text-center">No Users Are Available...</h2>
      )}
    </div>
  );
};

export default UserList;
