import { createSlice } from "@reduxjs/toolkit";
import { fetchUserWords, deleteWord, updateWord, addWord } from "./operations";

const initialState = {
  items: [],
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
        state.items = action.payload;
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
        state.items.push(action.payload);
      })
      .addCase(addWord.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
