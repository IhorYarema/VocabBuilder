import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
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
  const navigate = useNavigate();

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

  const handleFormSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (result.error) {
      toast.error(result.payload || "Login failed");
      return;
    }

    toast.success("Login successful!");
    navigate("/dictionary");
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(handleFormSubmit, onError)}
    >
      <h2 className={css.title}>Login</h2>
      <p className={css.formText}>
        Please enter your login details to continue using our service:
      </p>

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
        {loading ? "Loading..." : "Login"}
      </button>

      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
    </form>
  );
}
