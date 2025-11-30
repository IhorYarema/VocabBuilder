import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/client";

export const fetchUserWords = createAsyncThunk(
  "words/fetchUserWords",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/words/own");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/words/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/words/${id}`, payload);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addWord = createAsyncThunk(
  "words/addWord",
  async (wordData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("No access token");

      // Устанавливаем Authorization
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Отправка на бекенд
      const { data } = await api.post("/words/create", wordData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
