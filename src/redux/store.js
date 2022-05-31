import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./articleSlice";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        article: articleSlice,
        category: categorySlice,
    },
})