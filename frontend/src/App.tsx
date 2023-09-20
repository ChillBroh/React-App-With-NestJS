import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
