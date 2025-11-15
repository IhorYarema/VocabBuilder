import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className={css.title}>Register</h2>
      <p className={css.formText}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>
      <input
        className={css.input}
        type="text"
        name="name"
        placeholder="Name"
        {...register("name")}
      />

      <input
        className={css.input}
        type="email"
        name="email"
        placeholder="Email"
        {...register("email")}
      />

      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          {...register("password")}
        />
        <button
          className={css.btnIcon}
          type="button"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* <Icon
            className={css.iconEye}
            name={showPassword ? "eye" : "eye-off"}
            size={20}
          /> */}
        </button>
      </div>
      <button type="submit" className={css.btn}>
        Register
      </button>
      <a className={css.link}>Login</a>
    </form>
  );
}
