import * as Yup from "yup";

export const editWordSchema = Yup.object({
  en: Yup.string()
    .matches(
      /^\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b$/,
      "Only English letters, spaces, ' and - are allowed"
    )
    .required("English word is required"),

  ua: Yup.string()
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      "Only Ukrainian letters and spaces are allowed"
    )
    .required("Ukrainian word is required"),
});
