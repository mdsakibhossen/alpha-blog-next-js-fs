import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: "",
    slug: "",
    description: "",
    category: "",
    image: null,
    isFeatured: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost(state, action) {
            const { property, value } = action.payload;
            state[property] = value;

            // Automatically generate slug from title
            if (property === "title") {
                state.slug = value.toLowerCase().replaceAll(" ", "-");
            }
        },
        resetPost(state) {
            state.title = "";
            state.slug = "";
            state.description = "";
            state.category = "";
            state.image = null;
            state.isFeatured = false;
        },
    },
});

export const { setPost, resetPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
