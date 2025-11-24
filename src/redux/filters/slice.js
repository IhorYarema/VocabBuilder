import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchWords } from "./operations";

const initialState = {
  categories: [],
  selectedCategory: "all",
  verbType: null,
  query: "",
  loading: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      if (action.payload !== "verb") {
        state.verbType = null;
      }
    },
    setVerbType(state, action) {
      state.verbType = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWords.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchWords.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCategory, setVerbType, setQuery } = filtersSlice.actions;
export default filtersSlice.reducer;
