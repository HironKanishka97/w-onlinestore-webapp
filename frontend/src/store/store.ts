import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.ts";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems'], 
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cartItems: persistedCartReducer,
  },
  //below is to remove serializable issue
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);


