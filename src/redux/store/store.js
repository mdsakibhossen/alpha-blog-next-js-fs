import { categoryReducer } from "../features/category/categorySlice";
import { postReducer } from "../features/post/postSlice";
import { rootApi } from "../services/apiSlice";
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = {
    [rootApi.reducerPath]: rootApi.reducer,
    category: categoryReducer,
    post: postReducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(rootApi.middleware),
});