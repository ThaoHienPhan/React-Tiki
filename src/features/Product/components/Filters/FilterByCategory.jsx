import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import categoryApi from "api/categoryApi";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#c62828",
    },
    primary: {
      main: "#1976d2",
    },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "left",
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all 0.25s",
      "&:hover": {
        cursor: "pointer",
        color: theme.palette.primary.main,
      },
    },
  },
  subtitle:{
    fontWeight: "bold !important",
    fontSize: "18px !important",
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  const classes = useStyles();

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Faile to get category list", error);
      }
    })();
  }, []);
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" className={classes.subtitle}>Danh Mục Sản Phẩm</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
