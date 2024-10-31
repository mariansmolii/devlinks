import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks/useRedux";
import { getLinks } from "./store/link/linkOperations";
import { currentUser } from "./store/auth/authOperations";
import { Route, Routes, useLocation } from "react-router-dom";

import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import LinksPage from "./pages/LinksPage/LinksPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const paths = ["/", "/profile", "/preview"].includes(pathname);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (paths) {
      dispatch(getLinks());
    }
  }, [dispatch, paths]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <LinksPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="registration"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>

      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
    </>
  );
};

export default App;
