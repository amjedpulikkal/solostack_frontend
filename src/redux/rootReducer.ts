import { combineReducers } from "@reduxjs/toolkit";
import authorReducer from "./slices/authorSlice";
import socketReducer from "./slices/socketSlice";
import adminReducer from "./slices/adminSlice";


const rootReducer = combineReducers({
    author: authorReducer,
    socket:socketReducer,
    admin:adminReducer
});

export default rootReducer;