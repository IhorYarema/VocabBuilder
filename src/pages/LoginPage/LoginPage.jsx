import css from "./LoginPage.module.css";
import illustration from "../../assets/illustration.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function RegisterPage() {
  return (
    <section className={css.section}>
      <div className={css.sectionContainer}>
        <img
          src={illustration}
          alt="young couple sitting on the floor and reading"
          loading="lazy"
          className={css.img}
        />
        <LoginForm />
      </div>
    </section>
  );
}
