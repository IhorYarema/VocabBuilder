import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/client";

export const fetchRecommendedWords = createAsyncThunk(
  "recommend/fetchRecommendedWords",
  async ({ page, limit }, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/words/recommend?page=${page}&limit=${limit}`
      );
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addWordFromRecommend = createAsyncThunk(
  "recommend/addWordFromRecommend",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/words/add-from-recommend/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);
