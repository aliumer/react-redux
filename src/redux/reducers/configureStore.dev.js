import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./courseReducer";

const store = configureStore({
    reducer: rootReducer
});

export default store;