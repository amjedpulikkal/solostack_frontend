import { combineReducers } from "@reduxjs/toolkit";
import authorReducer from "./slices/authorSlice";
import socketReducer from "./slices/socketSlice";


const rootReducer = combineReducers({
    author: authorReducer,
    socket:socketReducer
});

export default rootReducer;