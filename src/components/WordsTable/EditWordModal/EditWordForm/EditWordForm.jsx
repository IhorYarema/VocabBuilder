import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateWord } from "../../../../redux/words/operations";
import { toast } from "react-toastify";
import css from "./EditWordForm.module.css";
import { editWordSchema } from "../../../../schemas/editWordSchema";

export default function EditWordForm({ word, onSuccess, onCancel }) {
  const dispatch = useDispatch();

  const initialValues = {
    en: word.en,
    ua: word.ua,
    category: word.category,
    isIrregular: word.isIrregular ?? null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateWord({ wordId: word._id, values }))
      .unwrap()
      .then((resp) => {
        toast.success(`Word "${resp.en}" updated!`);
        onSuccess();
      })
      .catch((err) => {
        toast.error(err?.message || "Server error");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editWordSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          {/* ENGLISH */}
          <label>
            English:
            <Field type="text" name="en" />
            <ErrorMessage name="en" component="p" className={css.error} />
          </label>

          {/* UKRAINIAN */}
          <label>
            Ukrainian:
            <Field type="text" name="ua" />
            <ErrorMessage name="ua" component="p" className={css.error} />
          </label>

          {/* BUTTONS */}
          <div className={css.buttons}>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
