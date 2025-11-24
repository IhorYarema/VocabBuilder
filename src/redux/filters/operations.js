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
  "words/fetchWords",
  async ({ category, search }, thunkAPI) => {
    try {
      let url = "/words";

      if (category && category !== "all") {
        url = `/words/${category}`;
      }

      // додаємо параметр пошуку
      if (search) {
        url += `?keyword=${encodeURIComponent(search)}`;
      }

      const { data } = await api.get(url);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);
