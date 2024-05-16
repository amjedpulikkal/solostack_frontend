import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
    name: "author",
    initialState: {
        author: null,
        isLoggedIn: false,
        authorData: null,
        searchResults: {
            searchOn: null,
            results: null,
        },
        presence: null
    },
    reducers: {
        setAuthor: (state,action) => {

            state.author = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setLogout: (state, action) => {
            state.authorData = null;
            state.author = null;
        },
        setAuthorData: (state, action) => {
            state.authorData = action.payload;
        },
        setPresence(state, action) {
            state.presence = action.payload;
        }
    },
});
export const {
    setLoggedIn,
    setAuthorData,
    setLogout,
    setPresence,
    setAuthor
} = authorSlice.actions;

export default authorSlice.reducer;