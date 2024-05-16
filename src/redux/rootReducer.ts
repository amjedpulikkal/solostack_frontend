import { combineReducers } from "@reduxjs/toolkit";
import authorReducer from "./slices/authorSlice";

const rootReducer = combineReducers({
    author: authorReducer,

});

export default rootReducer;