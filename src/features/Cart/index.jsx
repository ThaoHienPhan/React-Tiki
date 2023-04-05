import React from "react";
import PropTypes from "prop-types";
import { Box, Container, createTheme, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItemCountSelector,
  cartItemsEachSelector,
  cartItemTotalSelector,
} from "./selector";
import { removeItems, showProductList } from "../Cart/cartSlice";
import { IconButton } from "material-ui";
import Close from "@mui/icons-material/Close";
import useProductDetail from "features/Product/hook/useProductDetail";
import { useMatch } from "react-router-dom";
import store from "app/store";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constant/index";
import { PriceFormat } from "utils";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import QuantityField from "components/form-control/quantityField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

CartFeature.propTypes = {};
const theme = createTheme();
const useStyles = makeStyles({
  root: { paddingTop: "30px", backgroundColor: "#E9E9E9" },
  left: { width: "75%", fontWeight: "bold" },
  right: { width: "25%", fontWeight: "bold" },
  listProduct: {
    display: "flex",
    "& > div": {
      margin: "50px 60px",
    },
    "& > img": {
      marginTop: "25px",
    },
  },
  container: {
    paddingTop: "30px !important",
  },
  detail: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    "& > img": {
      marginRight: "15px",
    },
  },
});

function CartFeature(props) {
  const classes = useStyles();
  const cartCount = useSelector(cartItemCountSelector);
  const cartTotal = useSelector(cartItemTotalSelector);
  const state = store.getState();
  const dispatch = useDispatch();
  const schema = yup
    .object({
      quantity: yup
        .number()
        .required("Please enter quantity")
        .min(1, " Minimum quantity is 1")
        .typeError("Please enter number"),
    })
    .required();
  const cartQuantity = state.cart.cartItems.map((item) => item.quantity);
  const form = useForm({
    defaultValues: {
      quantity: cartQuantity ? cartQuantity : 1,
    },
    resolver: yupResolver(schema),
  });

  const handleRemove = (index) => {
    const action = removeItems(index);
    dispatch(action);
  };
  return (
    <Box pt={4}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              GIỎ HÀNG
            </Grid>
            <Grid item className={classes.right}>
              Total {PriceFormat(cartTotal)}
            </Grid>
            <TableContainer className={classes.container}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      Tất cả ({cartCount} sản phẩm)
                    </TableCell>
                    <TableCell align="left">Đơn Giá&nbsp;(VND)</TableCell>
                    <TableCell align="center">Số Lượng&nbsp;(cái)</TableCell>
                    <TableCell align="left">Thành Tiền</TableCell>
                    <TableCell align="left">
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.cart.cartItems.map((item) => (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left" component="th" scope="row">
                        <div className={classes.detail}>
                          <img
                            src={
                              item.product.thumbnail
                                ? `${STATIC_HOST}${item.product.thumbnail?.url}`
                                : THUMBNAIL_PLACEHOLDER
                            }
                            width="100px"
                          />
                          <div>{item.product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        {PriceFormat(item.product.salePrice)}
                      </TableCell>
                      <TableCell align="center">
                        <QuantityField
                          name="quantity"
                          item={item}
                          form={form}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {PriceFormat(item.quantity * item.product.salePrice)}
                      </TableCell>
                      <TableCell align="left">
                        <DeleteIcon
                          onClick={() => handleRemove(item.product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default CartFeature;
