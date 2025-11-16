import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

function App() {
  return (
    <div className={css.appWrapper}>
      <Header />
      <div className={css.pageContent}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<RegisterPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
