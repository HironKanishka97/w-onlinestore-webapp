import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.ts";

const store = configureStore({
    reducer: {
        cartItemSlice: cartReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;