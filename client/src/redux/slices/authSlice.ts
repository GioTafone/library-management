import axios from "axios";
import jwt_decode from "jwt-decode";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CredentialResponse } from "@react-oauth/google";
import { User, DecodedUser } from "types";
import { origin } from "config/origin";

export interface AuthState {
  items: User[];
  itemsRef: User[];
  token: string;
  decoded: {
    email: string;
    exp: number;
    iat: number;
    role: string;
    userId: string;
  };
  isLoading: boolean;
  error: any;
  success: boolean;
}

const initialState: AuthState = {
  items: [],
  itemsRef: [],
  isLoading: false,
  token: "",
  decoded: {
    email: "",
    exp: 0,
    iat: 0,
    role: "",
    userId: "",
  },
  error: null,
  success: false,
};

export const postUserCredentialThunk = createAsyncThunk(
  "Login/post",
  async (response: CredentialResponse) => {
    const url = `${origin}/api/v1/login`;
    try {
      if (response.credential) {
        const res = await axios.post(
          url,
          {},
          {
            headers: {
              id_token: response.credential,
            },
          }
        );
        const token = res.data.token;
        localStorage.setItem('token', token)
        console.log("TOKEN:", token);
        return token;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUserCredentialThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUserCredentialThunk.fulfilled, (state, action) => {
      state.token = action.payload;
      state.decoded = jwt_decode(state.token) as DecodedUser;
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(postUserCredentialThunk.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
