"use client";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/services/category/categoryApi";
import CategoryItem from "./category-item/CategoryItem";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useEffect, useState } from "react";
import { useCloudinary } from "@/hooks/useCloudinary";

const CategoryList = () => {
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const { removeImage } = useCloudinary();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesQuery();
  //   console.log(categories,"Categories");
  const [
    deleteCategory,
    {
      data: deleteMessage,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleting,
      error: deleteError,
      isError: isDeleteError,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isDeleting) {
      setMessage({
        text: "Deleting...",
        isSucceed: true,
      });
    }
    if (isDeleteSuccess) {
      setMessage({
        text: deleteMessage?.message || "Category deleted successfully.",
        isSucceed: true,
      });
    } else if (isDeleteError) {
      setMessage({
        text: deleteError?.data?.message || "Failed To Delete.",
        isSucceed: false,
      });
    }
  }, [isDeleting, isDeleteSuccess, isDeleteError]);

  const handleDeleteCategory = async (id, public_id) => {
    removeImage(public_id);
    await deleteCategory(id);
  };

  return (
    <div>
      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something Went Wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : categories.length >= 1 ? (
        <div className="table-wrapper max-w-[1000px] mx-auto mt-3">
          <AlertMessage message={message} />
          <table className="border border-collapse text-center w-full mt-3">
            <thead>
              <tr className="bg-slate-500 text-white uppercase">
                <th className="border font-medium p-2">Title</th>
                <th className="border font-medium p-2">Slug</th>
                <th className="border font-medium p-2">Icon</th>
                <th className="border font-medium p-2" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <CategoryItem
                  key={category._id}
                  category={category}
                  handleDeleteCategory={handleDeleteCategory}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-2xl text-center">No Categories Are Available...</h2>
      )}
    </div>
  );
};

export default CategoryList;
