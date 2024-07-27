import { createSlice } from "@reduxjs/toolkit";

interface SocketState {
  socketId: string | null;
}

const initialState: SocketState = {
  socketId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    clearSocketId: (state) => {
      state.socketId = null;
    },
  },
});

export const { setSocketId, clearSocketId } = socketSlice.actions;

export default socketSlice.reducer;
