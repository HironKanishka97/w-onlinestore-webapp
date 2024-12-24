import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../../types/CartItem.ts";

// Define the type for the state
interface CartState {
    cartItems: CartItem[];
}

// Explicitly set the initial state type
const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cartitems',
    initialState,
    reducers: {
        addCartItem(state:CartState , action:PayloadAction<CartItem>) {
            state.cartItems.push(action.payload);
        },
        removeCartItem(state:CartState, action:PayloadAction<CartItem>) {
            state.cartItems.splice(state.cartItems.indexOf(action.payload), 1);
        }

    }
})

export const {addCartItem,removeCartItem} = cartSlice.actions;
export default cartSlice.reducer;