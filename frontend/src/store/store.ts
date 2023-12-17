import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import agent from "./slices/agentSlice";
import property from "./slices/propertySlice";
const store = configureStore({
  reducer: {
    agent,
    property,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
