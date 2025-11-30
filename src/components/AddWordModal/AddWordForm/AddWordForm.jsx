import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../../../redux/words/operations";
import { toast } from "react-toastify";
import { selectCategories } from "../../../redux/filters/selectors";
import css from "./AddWordForm.module.css";
import { addWordSchema } from "../../../schemas/addWordSchema";

export default function AddWordForm({ onSuccess, onCancel }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const userId = useSelector((state) => state.auth.user?._id);

  const initialValues = {
    en: "",
    ua: "",
    category: "",
    isIrregular: null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { ...values };

    // isIrregular отправляем только для глаголов
    if (payload.category !== "verb") {
      delete payload.isIrregular;
    } else {
      payload.isIrregular = payload.isIrregular === "true";
    }

    dispatch(addWord(payload))
      .unwrap()
      .then((resp) => {
        toast.success(`Word "${resp.en}" added!`);
        onSuccess(); // закрыть модалку
      })
      .catch((err) => {
        toast.error(err?.message || "Server error");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addWordSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className={css.form}>
          {/* CATEGORY */}
          <label>
            Category:
            <Field as="select" name="category">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="p" className={css.error} />
          </label>

          {/* VERB OPTIONS */}
          {values.category === "verb" && (
            <div className={css.radioGroup}>
              <label>
                <Field type="radio" name="isIrregular" value="false" />
                Regular
              </label>

              <label>
                <Field type="radio" name="isIrregular" value="true" />
                Irregular
              </label>

              <ErrorMessage
                name="isIrregular"
                component="p"
                className={css.error}
              />
            </div>
          )}

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
              Add
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
