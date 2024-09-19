import { rootApi } from "../apiSlice";

export const postApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: ({ page = 1, limit = 2 } = {}) => `/posts?page=${page}&limit=${limit}`, // pagination support
            providesTags: ["post"],
        }),
        getPost: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: ["post"],
        }),
        addPost: builder.mutation({
            query: (post) => ({
                url: `/posts`,
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["post"],
        }),
        editPost: builder.mutation({
            query: ({ id, post }) => ({
                url: `/posts/${id}`,
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["post"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["post"],
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostQuery,
    useAddPostMutation,
    useEditPostMutation,
    useDeletePostMutation,
} = postApi;
