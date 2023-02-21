import { createSlice } from "@reduxjs/toolkit";

import { Book } from "types";
import {
  fetchBooksThunk,
  fetchBookByIsbnThunk,
  createBookThunk,
  deleteBookThunk,
  editBookThunk,
  fetchBookById,
  borrowBookThunk,
  returnBookThunk,
  fecthUserBorrowsThunk,
} from "redux/asyncThunks/bookThunks";

export interface BooksState {
  items: Book[];
  //type to fix
  itemsRef: any;
  booksUser: any;
  isLoading: boolean;
  error: any;
}

const initialState: BooksState = {
  items: [],
  itemsRef: [],
  booksUser: [],
  isLoading: false,
  error: null,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchBooksThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(fetchBookById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      state.itemsRef = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(fecthUserBorrowsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fecthUserBorrowsThunk.fulfilled, (state, action) => {
      const bookUser = action?.payload?.data;
      state.booksUser = bookUser;
      console.log("Book User", bookUser);
      console.log("state", state.booksUser);
      state.isLoading = false;
    });
    builder.addCase(fecthUserBorrowsThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(fetchBookByIsbnThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookByIsbnThunk.fulfilled, (state, action) => {
      state.itemsRef = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchBookByIsbnThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(createBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBookThunk.fulfilled, (state, action) => {
      const addBook = action.payload?.data;
      state.items = [...state.items, addBook];
      state.isLoading = false;
    });
    builder.addCase(createBookThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(deleteBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBookThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBookThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(editBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editBookThunk.fulfilled, (state, action) => {
      const editBook = action.payload?.data;
      state.items = [...state.items, editBook];
      state.isLoading = false;
    });
    builder.addCase(editBookThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(borrowBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(borrowBookThunk.fulfilled, (state, action) => {
      const editBook = action.payload?.data;
      state.items = [...state.items, editBook];
      state.isLoading = false;
    });
    builder.addCase(borrowBookThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(returnBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(returnBookThunk.fulfilled, (state) => {
      state.booksUser = [...state.booksUser];
      state.isLoading = false;
    });
    builder.addCase(returnBookThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default bookSlice.reducer;
