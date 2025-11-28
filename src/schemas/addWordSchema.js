import * as Yup from "yup";

export const addWordSchema = Yup.object({
  category: Yup.string().required("Category is required"),

  isIrregular: Yup.boolean()
    .nullable()
    .when("category", {
      is: "verb",
      then: (s) => s.required("Verb type is required"),
    }),

  en: Yup.string()
    .matches(
      /\b[A-Za-z,'-]+(?:\s+[A-Za-z,'-]+)*\b/,
      "Only English letters, commas, ' and - allowed"
    )
    .required("English word is required"),

  ua: Yup.string()
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s,]+$/u,
      "Only Ukrainian letters and commas allowed"
    )
    .required("Ukrainian word is required"),
});
