import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constant/index";
import { useDispatch, useSelector } from "react-redux";
import Close from "@mui/icons-material/Close";
import { cartItemCountSelector } from "../selector";
import { useSnackbar } from "notistack";
import { hideMiniCart, setQuantity } from "../cartSlice";
import store from "app/store";
import { useNavigate } from "react-router-dom";

MiniCart.propTypes = {
  product: PropTypes.object,
  setValue: PropTypes.func,
  handleCloseOutside: PropTypes.func,
  form: PropTypes.object,
};
const theme = createTheme();
const useStyles = makeStyles(() => ({
  right: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "320px",
    position: "absolute",
    right: "38px",
    top: "58px",
  },
  left: {
    width: "37%",
    textAlign: "left",
    paddingLeft: "10px",
    paddingTop: "5px",
  },
  icon: {
    position: "absolute",
    top: "6px",
    right: "4px",
    width: "fit-content",
    color: "black",
    cursor: "pointer",
    // zIndex: 1,
  },

  productName: {
    marginRight: "10px !important",
  },
  btn: {
    width: "100%",
  },
  paper: {
    position: "relative",
  },
}));
function MiniCart({
  product = {},
  setValue = null,
  handleCloseOutside = null,
  form = {},
}) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  // const quantity = useSelector(cartItemCountSelector);
  const productName = product.name;
  const dispatch = useDispatch();
  const state = store.getState();
  const navigate = useNavigate();
  const handleClose = () => {
    const action = hideMiniCart(state.cart.miniCart);
    dispatch(action);
    setValue(state.cart.miniCart);
  };
  const handleCart = () => {
    handleClose();
    navigate("/cart");
  };
  const quantity = form.getValues();
  return (
    <Box
      sx={{ border: 1, bgcolor: "background.paper", borderRadius: "10px" }}
      className={classes.popup}
    >
      <Paper elevation={0} className={classes.paper}>
        <Grid container>
          <Grid item className={classes.left}>
            <Box>
              <img src={thumbnailUrl} width={"80%"} />
            </Box>
          </Grid>
          <Grid item className={classes.right}>
            <Typography className={classes.productName}>
              {productName}
            </Typography>
            <Typography>x{quantity.quantity}</Typography>
          </Grid>
        </Grid>
        <Close className={classes.icon} onClick={handleClose} />

        <Button onClick={handleCart} className={classes.btn}>
          Xem giỏ hàng
        </Button>
      </Paper>
    </Box>
  );
}

export default MiniCart;
