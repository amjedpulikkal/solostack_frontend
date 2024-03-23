import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "student",
    initialState: {
        isLoggedIn: false,
        studentData: null,
        studentNotificationCount: 0,
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
            state.studentData = null;
        },
        setStudentData: (state, action) => {
            state.studentData = action.payload;
        },
        setPresence(state, action) {
            state.presence = action.payload;
        }
    },
});
export const {
    setLoggedIn,
    setStudentData,
    setLogout,
    setPresence
} = studentSlice.actions;

export default studentSlice.reducer;