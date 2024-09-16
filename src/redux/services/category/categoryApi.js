import { rootApi } from "../apiSlice";

export const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllProducts: builder.query({
        //     query: () => `products`,
        //     providesTags: ["products"],
        // }),

        // createProduct: builder.mutation({
        //     query: (product) => ({
        //         url: `products`,
        //         method: "POST",
        //         body: product,
        //     }),
        //     invalidatesTags: ["products"],
        // }),

        // removeProduct: builder.mutation({
        //     query: (prodId) => ({
        //         url: `products/${prodId}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["products"],
        // }),

    }),
});

export const { } = categoryApi;