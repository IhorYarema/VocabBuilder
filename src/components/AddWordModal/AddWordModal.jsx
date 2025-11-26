import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { addWord } from "../../redux/words/operations";
import { selectCategories } from "../../redux/filters/selectors";

const schema = Yup.object().shape({
  word: Yup.string().required("Word is required"),
  translation: Yup.string().required("Translation is required"),
  category: Yup.string().required("Category is required"),
  verbType: Yup.string().nullable(),
  example: Yup.string().nullable(),
});

export default function AddWordModal({ open, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      word: "",
      translation: "",
      category: "",
      verbType: "",
      example: "",
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      verbType: formData.category === "verb" ? formData.verbType : null,
    };

    const result = await dispatch(addWord(payload));

    if (result.meta.requestStatus === "fulfilled") {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Word</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Word"
          {...register("word")}
          error={!!errors.word}
          helperText={errors.word?.message}
        />

        <TextField
          label="Translation"
          {...register("translation")}
          error={!!errors.translation}
          helperText={errors.translation?.message}
        />

        <TextField
          select
          label="Category"
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        {selectedCategory === "verb" && (
          <TextField
            select
            label="Verb Type"
            {...register("verbType")}
            error={!!errors.verbType}
            helperText={errors.verbType?.message}
          >
            <MenuItem value="regular">Regular</MenuItem>
            <MenuItem value="irregular">Irregular</MenuItem>
          </TextField>
        )}

        <TextField
          label="Example sentence"
          multiline
          rows={3}
          {...register("example")}
          error={!!errors.example}
          helperText={errors.example?.message}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
