import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import filtersReducer from "./filters/slice";
import wordsReducer from "./words/slice";
import recommendReducer from "./recommend/slice";
import trainingReducer from "./training/slice";
// import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    words: wordsReducer,
    recommend: recommendReducer,
    training: trainingReducer,
    // user: userReducer,
  },
});
