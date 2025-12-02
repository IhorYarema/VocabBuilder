import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedWords, addWordFromRecommend } from "./operations";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  limit: 10,
  totalResults: 0,

  loading: false,
  error: null,
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // ░░░ FETCH RECOMMENDED WORDS ░░░
      .addCase(fetchRecommendedWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecommendedWords.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.limit = action.payload.limit;
        state.totalResults = action.payload.totalResults;
      })

      .addCase(fetchRecommendedWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load recommended words";
      })

      // ░░░ ADD WORD FROM RECOMMEND ░░░
      .addCase(addWordFromRecommend.fulfilled, (state, action) => {
        // після успішного додавання → видаляємо зі списку recommend
        state.items = state.items.filter(
          (word) => word._id !== action.payload._id
        );
      })

      .addCase(addWordFromRecommend.rejected, (state, action) => {
        state.error = action.payload || "Failed to add word";
      });
  },
});

export const { setPage, setLimit } = recommendSlice.actions;

export default recommendSlice.reducer;
