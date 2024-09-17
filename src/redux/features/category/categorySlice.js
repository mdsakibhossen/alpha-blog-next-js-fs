
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
    },
});

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;