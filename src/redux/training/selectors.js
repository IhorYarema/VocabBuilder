import { createSelector } from "@reduxjs/toolkit";

const selectTrainingState = (state) => state.training;

export const selectTasks = createSelector(
  selectTrainingState,
  (training) => training.tasks || []
);

export const selectLoading = createSelector(
  selectTrainingState,
  (training) => training.loading
);

export const selectError = createSelector(
  selectTrainingState,
  (training) => training.error
);
