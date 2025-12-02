import { createSlice } from "@reduxjs/toolkit";
import { fetchUserWords, deleteWord, updateWord, addWord } from "./operations";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  limit: 10,
  loading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserWords.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUserWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWord.fulfilled, (state, action) => {
        state.items = state.items.filter((w) => w._id !== action.payload);
      })

      .addCase(updateWord.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (w) => w._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(addWord.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(addWord.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
