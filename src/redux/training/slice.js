import { createSlice } from "@reduxjs/toolkit";
import { fetchTrainingTasks, sendTrainingResults } from "./operations";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  completed: false,
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTrainingTasks.pending, (st) => {
        st.loading = true;
        st.error = null;
      })
      .addCase(fetchTrainingTasks.fulfilled, (st, action) => {
        st.loading = false;
        st.tasks = action.payload?.tasks || [];
      })
      .addCase(fetchTrainingTasks.rejected, (st, { payload }) => {
        st.loading = false;
        st.error = payload;
      })

      .addCase(sendTrainingResults.pending, (st) => {
        st.error = null;
      })
      .addCase(sendTrainingResults.fulfilled, (st, action) => {
        st.completed = true;
        st.tasks = [];
      })
      .addCase(sendTrainingResults.rejected, (st, { payload }) => {
        st.error = payload;
      }),
});

export default trainingSlice.reducer;
