import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTheme } from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import QuantityField from "components/form-control/quantityField";
import { useDispatch, useSelector } from "react-redux";
import { hideMiniCart, showMiniCart } from "features/Cart/cartSlice";
import MiniCart from "features/Cart/components/MiniCart";
import { useSnackbar } from "notistack";
import store from "app/store";
import { useDetectClickOutside } from 'react-detect-click-outside';

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};

const theme = createTheme();
const useStyles = makeStyles(() => ({
  form: {
    padding: "20px 30px",
  },
  popup: {
    width: "300px",
  },
  right: {
    width: "60%",
    display: "flex",
    spacing: "0.5px !important",
    paddingTop: "20px",
  },
  left: {
    width: "40%",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    bottom: "50px",
    // right: theme.spacing(-0.7),
    left: "277px",

    width: "fit-content",
    color: "black",
    cursor: "pointer",
    // zIndex: 1,
  },
  productName: {
    marginRight: "10px !important",
  },
  cartContainer: {},
  miniCart: {
    // position: "absolute",
    // bottom: theme.spacing(2),
    // // right: theme.spacing(-0.7),
    // left: theme.spacing(35),
    // width: "fit-content",
    // color: "black",
    // zIndex: 1,
  },
}));

function AddToCart({ onSubmit = null, product = {} }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = store.getState();
  const [value, setValue] = useState(state.cart.miniCart);

  const schema = yup
    .object({
      quantity: yup
        .number()
        .required("Please enter quantity")
        .min(1, " Minimum quantity is 1")
        .typeError("Please enter number"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values); // wait for this finish = submitting
    }
  };
  const handleCart = () => {
    const action = showMiniCart(state.cart.miniCart);
    dispatch(action);
    setValue(state.cart.miniCart);
    console.log(state.cart.miniCart);

  };
  const handleCloseOutside = () => {
    const action = hideMiniCart(state.cart.miniCart);
    dispatch(action);
    setValue(state.cart.miniCart);
  };

  const ref = useDetectClickOutside({ onTriggered: handleCloseOutside });

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "250px" }}
        className={classes.submit}
        size="large"
        onClick={handleCart}
        aria-describedby="poper"
        ref={ref}
      >
        Add To Cart
      </Button>
      {state.cart.miniCart ? (
        <MiniCart product={product} setValue={setValue} handleCloseOutside={handleCloseOutside} />
      ) : ""}

    </form>
  );
}

export default AddToCart;
