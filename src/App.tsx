import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "pages";
import { Layout } from "components";
import { Message } from "components";
import styles from "App.module.scss";
import classNames from "classnames";

function App() {
  return (
    <BrowserRouter>
      <Message />
      <Layout>
        <div
          className={classNames(
            styles.App,
            `u-backgroundLightest u-padding u-positionRelative u-paddingLarge`
          )}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
