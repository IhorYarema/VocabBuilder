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
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "Only English letters allowed"
    )
    .required("English word is required"),

  ua: Yup.string()
    .matches(
      /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії\s,.'’"-]+$/,
      "Only Ukrainian letters allowed"
    )
    .required("Ukrainian word is required"),
});
