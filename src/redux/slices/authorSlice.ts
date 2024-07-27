import { StudentData } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorState {
  author: string | null;
  isLoggedIn: boolean;
  authorData: StudentData | null;
 
}

const initialState: AuthorState = {
  author: null,
  isLoggedIn: false,
  authorData: null,

};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<string | null>) => {
      state.author = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLogout: (state) => {
      state.authorData = null;
      state.author = null;
    },
    setAuthorData: (state, action: PayloadAction<StudentData | null>) => {
      state.authorData = action.payload;
    },
   
  },
});

export const {
  setLoggedIn,
  setAuthorData,
  setLogout,
  setAuthor
} = authorSlice.actions;

export default authorSlice.reducer;