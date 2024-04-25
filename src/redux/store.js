import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";

// Creating centralized Store
export const store = configureStore({
    reducer:{
        userReducer,
        productReducer
    }
})