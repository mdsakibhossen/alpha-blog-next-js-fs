import { rootApi } from "../apiSlice";

export const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => `/categories`,
            providesTags: ["category"],
        }),
        getCategory: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: ["category"],
        }),

        addCategory: builder.mutation({
            query: (category) => ({
                url: `/categories`,
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["category"],
        }),
        editCategory: builder.mutation({
            query: ({ id, category }) => (
                {
                    url: `/categories/${id}`,
                    method: "PUT",
                    body: category // Don't need to stringify. Because RTK Query Done The Job Underhood... 
                }
            ),
            invalidatesTags: ["category"]
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"],
        }),

    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } = categoryApi;