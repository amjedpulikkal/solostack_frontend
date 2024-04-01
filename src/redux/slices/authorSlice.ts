import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
    name: "author",
    initialState: {
        isLoggedIn: false,
        authorData: null,
        searchResults: {
            searchOn: null,
            results: null,
        },
        presence: null
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setLogout: (state, action) => {
            state.authorData = null;
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
    setPresence
} = authorSlice.actions;

export default authorSlice.reducer;