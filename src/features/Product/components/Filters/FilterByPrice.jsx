import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#c62828",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(1),
    borderTop: "1px solid #E8E8E8",
  },
  subtitle2: {
    fontWeight: "bold !important",
  },
  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2.5),
    "& > span": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  btn: {
    display: "block !important",
    margin: "auto !important",
  },
}));

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFilterPrice = () => {
    if (onChange) {
      onChange(values);
    }
    // setValues({
    //   salePrice_gte: 0,
    //   salePrice_lte: 0,
    // }); reset sau khi filter price
  };
  return (
    <Box className={classes.root}>
      <Typography className={classes.subtitle2} variant="subtitle2">
        CHỌN KHOẢNG GIÁ
      </Typography>
      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          variant="standard"
          size="small"
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          variant="standard"
          size="small"
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleFilterPrice}
        className={classes.btn}
      >
        Áp Dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
