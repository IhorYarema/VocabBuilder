import { createSlice } from "@reduxjs/toolkit";
import { fetchTrainingTasks, sendTrainingResults } from "./operations";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
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
      .addCase(fetchTrainingTasks.fulfilled, (st, { payload }) => {
        st.loading = false;
        st.tasks = payload;
      })
      .addCase(fetchTrainingTasks.rejected, (st, { payload }) => {
        st.loading = false;
        st.error = payload;
      })

      .addCase(sendTrainingResults.pending, (st) => {
        st.error = null;
      })
      .addCase(sendTrainingResults.fulfilled, () => {})
      .addCase(sendTrainingResults.rejected, (st, { payload }) => {
        st.error = payload;
      }),
});

export default trainingSlice.reducer;
