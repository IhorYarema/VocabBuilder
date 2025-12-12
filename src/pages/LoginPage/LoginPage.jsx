import css from "./LoginPage.module.css";
import illustration from "../../assets/illustration.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";

export default function RegisterPage() {
  return (
    <section className={css.section}>
      <Logo className={css.logo} />
      <div className={css.sectionContainer}>
        <div className={css.imgWrapper}>
          <img
            src={illustration}
            alt="young couple sitting on the floor and reading"
            loading="lazy"
            className={css.img}
          />
        </div>
        <p>Word · Translation · Grammar · Progress</p>

        <LoginForm />
      </div>
    </section>
  );
}
