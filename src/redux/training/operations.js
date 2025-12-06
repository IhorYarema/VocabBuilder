import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/client";

export const fetchTrainingTasks = createAsyncThunk(
  "training/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await api.get("/words/tasks");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const sendTrainingResults = createAsyncThunk(
  "training/sendResults",
  async (answers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await api.post("/words/answers", { answers });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
