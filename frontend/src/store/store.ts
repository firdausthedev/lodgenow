import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import agent from "./slices/agentSlice";
import property from "./slices/propertySlice";
import search from "./slices/searchSlice";
import user from "./slices/userSlice";
import booking from "./slices/bookingSlice";
import cart from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    search,
    agent,
    property,
    user,
    booking,
    cart,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
