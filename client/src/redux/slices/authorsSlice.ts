import { createSlice } from "@reduxjs/toolkit";

import { Author } from "types";
import {
  fetchAuthorThunk,
  createAuthorThunk,
  fetchAuthorById,
  deleteAuthorThunk,
  editAuthorThunk,
} from "redux/asyncThunks/authorThunks";

export interface AuthorState {
  items: Author[];
  //type to fix
  itemsRef: any;
  isLoading: boolean;
  error: any;
}

const initialState: AuthorState = {
  items: [],
  itemsRef: [],
  isLoading: false,
  error: null,
};

export const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthorThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchAuthorThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(fetchAuthorById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthorById.fulfilled, (state, action) => {
      state.itemsRef = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchAuthorById.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(createAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAuthorThunk.fulfilled, (state, action) => {
      const addAuthor = action.payload?.data;
      state.items = [...state.items, addAuthor];
      state.isLoading = false;
    });
    builder.addCase(createAuthorThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(deleteAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAuthorThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteAuthorThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(editAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editAuthorThunk.fulfilled, (state, action) => {
      const editAuthor = action.payload?.data;
      state.items = [...state.items, editAuthor];
      state.isLoading = false;
    });
    builder.addCase(editAuthorThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default authorSlice.reducer;
