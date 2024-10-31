import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks/useRedux";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Route, Routes, useLocation } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";
import LinksPage from "./pages/LinksPage/LinksPage";
import { getLinks } from "./store/link/linkOperations";

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const paths = ["/", "/profile", "/preview"].includes(pathname);

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
