import { categoryReducer } from "../features/category/categorySlice";
import { rootApi } from "../services/apiSlice";
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = {
    [rootApi.reducerPath]: rootApi.reducer,
    category: categoryReducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(rootApi.middleware),
});