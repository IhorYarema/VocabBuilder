import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import { fetchCurrentUser } from "./redux/auth/operations";

const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DictionaryPage = lazy(() =>
  import("./pages/DictionaryPage/DictionaryPage")
);
const RecommendPage = lazy(() => import("./pages/RecommendPage/RecommendPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage/TrainingPage"));

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <div className={css.appWrapper}>
      {isLoggedIn && <Header />}
      <div className={css.pageContent}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DictionaryPage />
                </PrivateRoute>
              }
            />

            {/* PUBLIC ROUTES */}
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* PRIVATE ROUTE */}
            <Route
              path="/dictionary"
              element={
                <PrivateRoute>
                  <DictionaryPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/recommend"
              element={
                <PrivateRoute>
                  <RecommendPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/training"
              element={
                <PrivateRoute>
                  <TrainingPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
