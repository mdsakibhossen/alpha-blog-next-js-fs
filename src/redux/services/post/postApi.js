import { rootApi } from "../apiSlice";

export const postApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllPosts: builder.query({
        //     query: ({ page = 1, limit=8, fetchAll = false }) => {
        //         let queryString = fetchAll
        //             ? `/posts?fetchAll=true`
        //             : `/posts?page=${page}&limit=${limit}`;
        //         return queryString;
        //     }, 
        //     providesTags: ["post"],
        // }),
        getAllPosts: builder.query({
            query: ({ page = 1, limit = 0, user = "", category = "", isFeatured = false }) => `/posts?page=${page}&limit=${limit}${user ? ("&user=" + user) : ""}${category ? ("&category=" + category) : ""}${isFeatured ? ("&isFeatured=" + isFeatured) : ""}`,
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
