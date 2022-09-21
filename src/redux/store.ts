import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import applicationReducer from "./slices/applicationSlice";

export const store = configureStore({
  reducer: { tasksReducer, applicationReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
