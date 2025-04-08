import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.ts";
import jwtReducer from "./slices/jwtSlice.ts";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems'],
};
const tokenPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['jwttoken'],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedTokenReducer = persistReducer(tokenPersistConfig, jwtReducer);

const store = configureStore({
  reducer: {
    cartItems: persistedCartReducer,
    jwttoken: persistedTokenReducer
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


