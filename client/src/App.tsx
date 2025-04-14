import LinkPage from "./pages/LinkPage/LinkPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";

import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks/useRedux";
import { getLinks } from "./store/link/linkOperations";
import { currentUser } from "./store/auth/authOperations";
import { Route, Routes, useLocation } from "react-router-dom";
import { getProfileInfo } from "./store/profile/profileOperations";

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
      dispatch(getProfileInfo());
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
                <LinkPage />
              </PrivateRoute>
            }
          />

          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
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
