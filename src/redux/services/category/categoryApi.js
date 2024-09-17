import { rootApi } from "../apiSlice";

export const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => `/categories`,
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

        // removeProduct: builder.mutation({
        //     query: (prodId) => ({
        //         url: `products/${prodId}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["products"],
        // }),

    }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation } = categoryApi;