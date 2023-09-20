import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import ResetPassword from "../pages/ResetPassword";
import InputResetPass from "../pages/InputResetPass";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Register />} />
      <Route path="/welcome/:token" element={<Welcome />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/password-enter/:email" element={<InputResetPass />} />
    </Routes>
  );
};

export default Router;
