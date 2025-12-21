import css from "./RegisterPage.module.css";
import illustration from "../../assets/illustration.jpg";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../components/Logo/Logo";

export default function RegisterPage() {
  return (
    <section className={css.section}>
      <Logo className={css.logo} />
      <div className={css.sectionContainer}>
        <div className={css.imgtextContainer}>
          <div className={css.imgWrapper}>
            <img
              src={illustration}
              alt="young couple sitting on the floor and reading"
              loading="lazy"
              className={css.img}
            />
          </div>
          <p className={css.text}>Word · Translation · Grammar · Progress</p>
        </div>
        <RegisterForm className={css.form} />
      </div>
    </section>
  );
}
