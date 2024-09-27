
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    title: "",
    slug: "",
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory(state, action) {
            const { property, value } = action.payload;
            state[property] = value;

            if (property === "title") {
                state.slug = value.toLowerCase().replaceAll(" ", "-");
            }
        },
        resetCategory(state) {
            state.title = "";
            state.slug = "";
        }
    },
});

export const { setCategory,resetCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;