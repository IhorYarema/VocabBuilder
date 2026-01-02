import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../../../redux/words/operations";
import { toast } from "react-toastify";
import css from "./AddWordForm.module.css";
import { addWordSchema } from "../../../schemas/addWordSchema";
import Icon from "../../Icon/Icon";
import Select from "react-select";
import {
  selectCategories,
  selectCategory,
  selectVerbType,
  selectQuery,
} from "../../../redux/filters/selectors";

import {
  setCategory,
  setVerbType,
  setQuery,
} from "../../../redux/filters/slice";
import "./select.css";

export default function AddWordForm({ onSuccess, onCancel, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const userId = useSelector((state) => state.auth.user?._id);

  const selectedCategory = useSelector(selectCategory);
  const verbType = useSelector(selectVerbType);
  // const query = useSelector(selectQuery);

  const options = categories.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }));

  const selectedOption = options.find((opt) => opt.value === selectedCategory);

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
          <button className={css.closeBtn} onClick={onClose}>
            <Icon className={css.iconCross} name="x-close" size={24} />
          </button>
          <h2 className={css.title}>Add word</h2>
          <p className={css.text}>
            Adding a new word to the dictionary is an important step in
            enriching the language base and expanding the vocabulary.
          </p>
          {/* CATEGORY */}
          <Select
            unstyled
            value={selectedOption}
            // onChange={handleCategoryChange}
            options={options}
            isSearchable={false}
            className={css.reactSelectContainer}
            classNamePrefix="custom"
          />

          {/* VERB OPTIONS */}
          {selectedCategory === "verb" && (
            <div className={css.verbOptions}>
              <label className={css.radioLabel}>
                <input
                  type="radio"
                  name="verbType"
                  value="regular"
                  checked={verbType === "regular"}
                  // onChange={handleVerbTypeChange}
                  className={css.radio}
                />
                Regular
              </label>

              <label className={css.radioLabel}>
                <input
                  type="radio"
                  name="verbType"
                  value="irregular"
                  checked={verbType === "irregular"}
                  // onChange={handleVerbTypeChange}
                  className={css.radio}
                />
                Irregular
              </label>
            </div>
          )}

          {/* UKRAINIAN */}
          <label className={css.label}>
            <div className={css.labelCont}>
              <Icon className={css.iconUa} name="ukraine" size={28} />
              Ukrainian
            </div>
            <Field type="text" name="ua" className={css.input} />
            <ErrorMessage name="ua" component="p" className={css.error} />
          </label>

          {/* ENGLISH */}
          <label className={css.label}>
            <div className={css.labelCont}>
              <Icon className={css.iconUa} name="unitedkingdom" size={28} />
              English
            </div>
            <Field type="text" name="en" className={css.input} />
            <ErrorMessage name="en" component="p" className={css.error} />
          </label>

          {/* BUTTONS */}
          <div className={css.buttons}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.saveBtn}
            >
              Add
            </button>
            <button type="button" onClick={onCancel} className={css.cancelBtn}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
