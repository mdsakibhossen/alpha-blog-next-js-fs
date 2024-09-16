import { rootApi } from "../services/apiSlice";
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = {
    [rootApi.reducerPath]: rootApi.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(rootApi.middleware),
});