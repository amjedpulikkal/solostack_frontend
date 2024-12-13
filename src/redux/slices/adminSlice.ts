
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorState {
  isLoggedIn: boolean;
  authorData: any;
}

const initialState: AuthorState = {
  isLoggedIn: false,
  authorData: null,
};

const authorSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<any>) => {
      state.authorData = action.payload;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.authorData = null;
      state.isLoggedIn = false;
    },
    
  },
});

export const { setLoggedIn, setLogout } = authorSlice.actions;

export default authorSlice.reducer;
