import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { origin } from "config/origin";
import { Author } from "types";

export const fetchAuthorThunk = createAsyncThunk(
  "authors/fecthAll",
  async () => {
    const url = `${origin}/api/v1/authors`;
    try {
      const res = await axios.get(url);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

export const fetchAuthorById = createAsyncThunk(
  "authorById/fetch",
  async (_id: string) => {
    const url = `${origin}/api/v1/authors/id/${_id}`;
    try {
      const res = await axios.get(url);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

export const createAuthorThunk = createAsyncThunk(
  "author/create",
  async (author: Author) => {
    const url = `${origin}/api/v1/authors`;
    try {
      const res = await axios.post(url, author);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

export const deleteAuthorThunk = createAsyncThunk(
  "author/delete",
  async (id: string) => {
    const url = `${origin}/api/v1/authors/id/${id}`;
    try {
      const res = await axios.delete(url);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const editAuthorThunk = createAsyncThunk(
  "author/update",
  async (author: Author) => {
    try {
      const url = `${origin}/api/v1/authors/id/${author._id}`;
      const res = await axios.put(url, author);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

