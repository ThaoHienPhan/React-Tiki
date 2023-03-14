import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, useMatch } from "react-router-dom";
import ListPage from "./pages/ListPages";
import DetailPage from "./pages/DetailPage";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Routes>
        <Route path={match.path} element={<ListPage />} />
        <Route path={`${match.path}/:todoId`} element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default TodoFeature;
