import React from "react";
import PropTypes from "prop-types";
import { Box, createTheme, Skeleton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PriceFormat } from "utils";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: "30px",
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #bdbdbd",
  },
  name: {
    fontSize: "35px !important",
    fontWeight: "bold !important",
  },
  shortDescription: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  salePrice: {
    paddingRight: theme.spacing(3),
    fontSize: "30px !important",
    fontWeight: "bold !important",
  },
  originalPrice: {
    paddingRight: theme.spacing(1),
    textDecoration: "line-through !important",
    color: "#7e7e7e !important",
    fontSize: "18px !important",
  },
  priceSection: {
    padding: theme.spacing(2),
    backgroundColor: "#f6f6f6 !important",
    fontSize: "18px !important",
  },
}));

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.shortDescription}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceSection}>
        <Box component="span" className={classes.salePrice}>
          {PriceFormat(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {PriceFormat(originalPrice)}
            </Box>
            <Box component="span" color="red">{`-${PriceFormat(
              promotionPercent
            )}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
