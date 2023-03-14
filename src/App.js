import "./App.css";
import TodoFeature from "./features/Todo/pages/ListPages";
import React, { useEffect } from "react";
import AlbumFeature from "./features/Album";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Header from "components/Header";

import ProductFeature from "features/Product";
import CartFeature from "features/Cart";

function App() {
  const pathname = "/products";
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route exact path="/home" element={<Navigate to="/" />} /> */}
        {/* <Route path="/" element={<CounterFeature />} /> */}
        <Route path="/" element={<ProductFeature />} />
        <Route path="products/*" element={<ProductFeature />} />
        <Route path="cart" element={<CartFeature />} />
        {/* <Route path=":productId" element={<DetailPage />} /> */}
        {/* <Route path={`${pathname}/:productId`} element={<DetailPage  />} /> */}

        <Route path="/todos" element={<TodoFeature />} />
        <Route path="/albums" element={<AlbumFeature />} />

        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
