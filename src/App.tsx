import React from "react";
import "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";
import { Layout } from "./components";
import styles from "./App.module.scss";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div
          className={`${styles.App} u-backgroundLightest u-padding u-positionRelative u-paddingLarge`}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
