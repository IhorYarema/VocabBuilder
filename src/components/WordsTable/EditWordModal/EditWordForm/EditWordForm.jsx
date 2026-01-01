import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { updateWord } from "../../../../redux/words/operations";
import { toast } from "react-toastify";
import css from "./EditWordForm.module.css";
import { editWordSchema } from "../../../../schemas/editWordSchema";
import Icon from "../../../Icon/Icon";

export default function EditWordForm({
  word,
  onSuccess,
  onCancel,
  onClose,
  className,
}) {
  const dispatch = useDispatch();

  const initialValues = {
    en: word.en,
    ua: word.ua,
    category: word.category,
    isIrregular: word.isIrregular ?? false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Validate
    try {
      await editWordSchema.validate(values, { abortEarly: false });
    } catch (validationError) {
      validationError.inner.forEach((err) => toast.error(err.message));
      setSubmitting(false);
      return;
    }

    // Якщо це НЕ дієслово → isIrregular не потрібний
    const payload = { ...values };
    if (payload.category !== "verb") {
      delete payload.isIrregular;
    }

    try {
      const resp = await dispatch(
        updateWord({ wordId: word._id, values: payload })
      ).unwrap();

      toast.success(`Word "${resp.en}" updated!`);
      onSuccess();
    } catch (err) {
      toast.error(err?.message || "Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className={`${css.form} ${className}`}>
          <button className={css.closeBtn} onClick={onClose}>
            <Icon className={css.iconCross} name="x-close" size={24} />
          </button>
          <label className={css.label}>
            <div className={css.labelCont}>
              <Icon className={css.iconUa} name="ukraine" size={28} />
              Ukrainian
            </div>
            <Field type="text" name="ua" className={css.input} />
          </label>

          <label className={css.label}>
            <div className={css.labelCont}>
              <Icon className={css.iconUa} name="unitedkingdom" size={28} />
              English
            </div>
            <Field type="text" name="en" className={css.input} />
          </label>

          <div className={css.buttons}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.saveBtn}
            >
              Save
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
