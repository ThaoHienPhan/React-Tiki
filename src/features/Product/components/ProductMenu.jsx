import React from "react";
import PropTypes from "prop-types";
import { Box, createTheme, Link } from "@mui/material";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { makeStyles } from "@mui/styles";


ProductMenu.propTypes = {};
const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ff4400",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row nowrap !important",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    listStyleType: "none",
    "& > li": {
      padding: theme.spacing(2, 4),
    },
    "& > li > a": {
      color: "gray",
    },
    "& > li > a.active": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      fontWeight: "bold",
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();
  const match = useMatch("/products/:productId/*");

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${match.pathnameBase}`}>
          Description
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${match.pathnameBase}/additional`}>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${match.pathnameBase}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
