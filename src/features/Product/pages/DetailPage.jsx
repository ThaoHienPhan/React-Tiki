import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Route, Routes, useMatch } from "react-router-dom";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hook/useProductDetail";
import CircularProgress from "@mui/material/CircularProgress";
import ProductInfo from "../components/ProductInfo";
import AddToCart from "../components/AddToCart";
import ProductMenu from "../components/ProductMenu";
import ProductDescription from "../components/ProductDescription";
import ProductAdditional from "../components/ProductAdditional";
import ProductReview from "../components/ProductReview";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Cart/cartSlice";

DetailPage.propTypes = {};
const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: { paddingTop: "30px", backgroundColor: "#E9E9E9" },
  right: { flex: "1 1 0" },
  left: {
    width: "400px",
    padding: "24px 40px",
    borderRight: "1px solid #bdbdbd",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function DetailPage(props) {
  const {
    params: { productId },
  } = useMatch("/products/:productId/*");

  const { product, loading } = useProductDetail(productId);

  const classes = useStyles();
  const dispatch = useDispatch();
  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <Box className={classes.loading}>
          <CircularProgress size="50px" />
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            fontSize="50px"
          >
            Loading
          </Typography>
        </Box>
      </Box>
    );
  }
  const handleAddToCart = (formValues) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    dispatch(action);
  };
  return (
    <Box pt={4}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCart onSubmit={handleAddToCart} product={product} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Routes>
          <Route
            exact
            path="/"
            element={<ProductDescription product={product} />}
          />
          <Route exact path="additional" element={<ProductAdditional />} />
          <Route exact path="reviews" element={<ProductReview />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default DetailPage;
