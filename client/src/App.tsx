import LinkPage from "./pages/LinkPage/LinkPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";

import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/useRedux";
import { currentUser } from "./store/auth/authOperations";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <LinkPage />
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
