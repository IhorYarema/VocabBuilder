import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/client";

// GET categories
export const fetchCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/words/categories");
      return data; // реальні ключі
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET words with filters
export const fetchWords = createAsyncThunk(
  "filters/fetchWords",
  async ({ category, verbType, query }, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      if (category && category !== "all") {
        params.append("category", category);
      }

      if (category === "verb" && verbType) {
        params.append("verbType", verbType);
      }

      if (query) {
        params.append("keyword", query);
      }

      const { data } = await api.get(`/words?${params.toString()}`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
