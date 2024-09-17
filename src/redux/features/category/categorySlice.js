
import { createSlice } from '@reduxjs/toolkit';
// TODO: Make it Category Slice
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
        setSlugOnChangeTitle(state, action) {

        },
        // editUser(state, action) {
        //     const { _id, username, email, password } = action.payload;
        //     state.editMode = true;
        //     state.editableUserId = _id;
        //     state.user = { username, email, password };
        // },
        resetForm() {
            return initialState;
        }
    },
});

export const { setCategory, resetForm } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;