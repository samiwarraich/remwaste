import { configureStore } from "@reduxjs/toolkit";
import skipsReducer from "@/redux/skips/slice";

export const store = configureStore({
  reducer: {
    skips: skipsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
