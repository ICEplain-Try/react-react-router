import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import ViewProductPage from "./pages/ViewProductPage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* เส้นทางแต่ละหน้า */}
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/view/:id" element={<ViewProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
