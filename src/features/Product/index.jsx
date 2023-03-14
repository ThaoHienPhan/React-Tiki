import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import { Routes, Route } from "react-router-dom";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":productsId/*" element={<DetailPage />} />

        <Route />
      </Routes>
    </Box>
  );
}

export default ProductFeature;
