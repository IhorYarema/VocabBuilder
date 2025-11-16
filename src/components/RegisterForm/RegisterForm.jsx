import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^[A-Za-z]{6}\d$/,
      "Password must be 6 letters followed by 1 number"
    )
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const onError = (formErrors) => {
    const messages = Object.values(formErrors).map((err) => err.message);
    messages.forEach((msg) => toast.error(msg));
  };

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((p) => !p);

  const handleFormSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(handleFormSubmit, onError)}
    >
      <h2 className={css.title}>Register</h2>
      <p className={css.formText}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>

      <input
        className={css.input}
        type="text"
        placeholder="Name"
        {...register("name")}
      />

      <input
        className={css.input}
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />
        <button className={css.btnIcon} type="button" onClick={togglePassword}>
          👁
        </button>
      </div>

      <button type="submit" className={css.btn} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>

      <a className={css.link}>Login</a>
    </form>
  );
}
