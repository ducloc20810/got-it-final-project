import React from "react";
import "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
