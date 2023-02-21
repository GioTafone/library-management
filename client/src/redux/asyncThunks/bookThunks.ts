import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { origin } from "config/origin";
import { Book, FetchBook } from "types";

export const fetchBooksThunk = createAsyncThunk(
  "books/fetchAll",
  async ({ filter }: { filter?: string } = { filter: "" }) => {
    let url: string;

    if (filter) {
      url = `${origin}/api/v1/books/filter?${filter}`;
    } else {
      url = `${origin}/api/v1/books`;
    }

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

export const fecthUserBorrowsThunk = createAsyncThunk(
  "books/borrowedByUser",
  async (borrowerId: string | null) => {
    try {
      const url = `${origin}/api/v1/books/user/${borrowerId}`;
      const res = await axios.get(url);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchBookByIsbnThunk = createAsyncThunk(
  "BookByIsbn/fetch",
  async ({ isbn, token }: FetchBook) => {
    const url = `${origin}/api/v1/books/isbn/${isbn}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const fetchBookById = createAsyncThunk(
  "bookByID/fetch",
  async (_id: Book) => {
    const url = `${origin}/api/v1/books/id/${_id}`;
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

export const createBookThunk = createAsyncThunk(
  "book/create",
  async (book: Book) => {
    const url = `${origin}/api/v1/books`;
    try {
      const res = await axios.post(url, book);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBookThunk = createAsyncThunk(
  "book/delete",
  async (id: string) => {
    const url = `${origin}/api/v1/books/id/${id}`;
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

export const editBookThunk = createAsyncThunk(
  "book/update",
  async (book: Book) => {
    try {
      const url = `${origin}/api/v1/books/id/${book._id}`;
      const res = await axios.put(url, book);
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const borrowBookThunk = createAsyncThunk(
  "book/borrow",
  async ({ bookId, userId, token }: FetchBook) => {
    try {
      const url = `${origin}/api/v1/books/borrow/${bookId}`;
      const res = await axios.put(
        url,
        {
          borrowerId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const returnBookThunk = createAsyncThunk(
  "book/return",
  async (bookId: string) => {
    try {
      const url = `${origin}/api/v1/books/return/${bookId}`;
      const res = await axios.put(url, {
        borrowerId: null,
      });
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);
