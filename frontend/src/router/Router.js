import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Register />} />
      <Route path="/welcome/:token" element={<Welcome />} />
    </Routes>
  );
};

export default Router;
