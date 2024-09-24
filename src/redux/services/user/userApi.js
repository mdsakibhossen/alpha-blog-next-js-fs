import { rootApi } from "../apiSlice";

export const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/users`,
            providesTags: ["user"],
        }),
        getUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: ["user"],
        }),

        // addUser: builder.mutation({
        //     query: (user) => ({
        //         url: `/users`,
        //         method: "POST",
        //         body: user,
        //     }),
        //     invalidatesTags: ["user"],
        // }),
        editUser: builder.mutation({
            query: ({ id, user }) => (
                {
                    url: `/users/${id}`,
                    method: "PUT",
                    body: user // Don't need to stringify. Because RTK Query Done The Job Underhood... 
                }
            ),
            invalidatesTags: ["user"]
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),

    }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useAddUserMutation, useEditUserMutation, useDeleteUserMutation } = userApi;