import LinkPage from "./pages/LinkPage/LinkPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SharePage from "./pages/SharePage/SharePage";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";

import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks/useRedux";
import { getLinks } from "./store/link/linkOperations";
import { currentUser } from "./store/auth/authOperations";
import { Route, Routes, useLocation } from "react-router-dom";
import { getProfileInfo } from "./store/profile/profileOperations";
import PageLoader from "./components/ui/Loader/PageLoader";

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isReady, setIsReady] = useState(false);

  const paths = ["/", "/profile", "/preview"].includes(pathname);

  useEffect(() => {
    const handleLoad = () => setIsReady(true);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (paths) {
      dispatch(getLinks());
      dispatch(getProfileInfo());
    }
  }, [dispatch, paths]);

  if (!isReady) return <PageLoader />;

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

          <Route
            path="preview"
            element={
              <PrivateRoute>
                <PreviewPage />
              </PrivateRoute>
            }
          />

          <Route path="share/:id" element={<SharePage />} />
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
