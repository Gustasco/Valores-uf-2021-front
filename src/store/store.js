import { configureStore } from "@reduxjs/toolkit";
import dataReducers from "./reducers/data.reducers";

export const store = configureStore({
    reducer: {
        data: dataReducers,
    }
})