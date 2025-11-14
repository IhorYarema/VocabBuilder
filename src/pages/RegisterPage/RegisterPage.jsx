import css from "./RegisterPage.module.css";
import illustration from "../../assets/illustration.jpg";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

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
        <RegisterForm />
      </div>
    </section>
  );
}
