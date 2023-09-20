import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Router from "../router/Router";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
};

export default Layout;
