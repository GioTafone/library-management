import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import { User } from "types";
import { origin } from "config/origin";

export interface UserState {
  items: User[];
  itemsRef: User[];
  isLoading: boolean;
  error: any;
}

const initialState: UserState = {
  items: [],
  itemsRef: [],
  isLoading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
  const URL = `${origin}/api/v1/users`;

  const res = await axios.get(URL);
  return {
    data: res.data,
    status: res.status,
  };
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.itemsRef = action.payload.data;
      //console.log("Payload:", action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
