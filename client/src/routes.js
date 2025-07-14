import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";

export const useRoutes = (islogin) => {

  // If the user is authenticated, show the main page
  if (islogin) {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    );
  }
  // If the user is not authenticated, show the login page
  return (
    <Routes>
      <Route path="/login" element={<AuthPage type='login'/>} />
      <Route path="/registration" element={<AuthPage type='registration'/>} />
      <Route path="/*" element={<Navigate to="/login" replace />}/>
    </Routes>
  )

}