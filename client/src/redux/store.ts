import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import booksReducer from "redux/slices/booksSlice";
import authReducer from "redux/slices/authSlice";
import usersReducer from "redux/slices/userSlice";
import authorsReducer from "redux/slices/authorsSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    users: usersReducer,
    authors: authorsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
