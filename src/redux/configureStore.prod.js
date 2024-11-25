import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    // Add prod only config here if necessary
    reducer: rootReducer
});

export default store; 
