import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
    tagTypes: ["category","post","user"],
    endpoints: () => ({}),
});