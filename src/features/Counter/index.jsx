import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { decrease, increase } from "./counterSlice";

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

CounterFeature.propTypes = {};

// const useStyles = styled({
//   root: {
//     color: "darkslategray",
//     backgroundColor: "aliceblue",
//     padding: 8,
//     borderRadius: 4,
//   },
// });
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
  root: {
    color: "black",
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 4,
  },
}));


function CounterFeature(props) {
  const classes = useStyles();
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const handleIncreaseBtn = () => {
    const action = increase();
    dispatch(action);
  };
  const handleDecreaseBtn = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <div>
      Counter: {count}
      <div>
        <Button className={classes.root} onClick={handleIncreaseBtn}>
          Increase
        </Button>
        <Button className={classes.root} onClick={handleDecreaseBtn}>
          Decrease
        </Button>
      </div>
    </div>
  );
}

export default CounterFeature;
