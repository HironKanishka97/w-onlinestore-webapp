import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem.ts";


// Define the type for the state
interface CartState {
    cartItems: CartItem[];
}
interface UpdateCartItemObj {
    productId: number;
    productCount: number;
}

// Explicitly set the initial state type
const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {

        addCartItem(state: CartState, action: PayloadAction<CartItem>) {
            const existingItem = state.cartItems.find(
                (ci) => ci.product.id === action.payload.product.id
            );
            if (existingItem) {
                existingItem.productCount += action.payload.productCount;
            } else {
                state.cartItems.push(action.payload);
            }

        },

        updateCartItem(state: CartState, action: PayloadAction<UpdateCartItemObj>) {

            const existingItem = state.cartItems.find(
                (ci) => ci.product.id === action.payload.productId
            );

            if (existingItem) {
                if (existingItem.productCount > 1) {
                    existingItem.productCount += action.payload.productCount;
                } else if (existingItem.productCount === 1 && action.payload.productCount === -1) {
                    state.cartItems = state.cartItems.filter(
                        (ci) => ci.product.id !== existingItem.product.id
                    );
                } else {
                    existingItem.productCount += action.payload.productCount;
                }
            }
        }



    }
})

export const { addCartItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;