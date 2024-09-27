import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API}/api` }),
    tagTypes: ["category","post","user"],
    endpoints: () => ({}),
});