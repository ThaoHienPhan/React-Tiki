import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  Box,
  createTheme,
  FormHelperText,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { setQuantity } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const theme = createTheme();
const useStyles = makeStyles(() => ({
  container: {
    // display: "flex",
    padding: theme.spacing(2),
  },
  input: {
    width: "30% !important",
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled, item } = props;
  const {
    formState: { errors, ...formState },
  } = form;
  const { setValue, getValues } = form;
  const hasError = !!errors[name];
  const dispatch = useDispatch();
  const handleQuantity = (type) => {
    const action = setQuantity({
      id: item?.product.id,
      quantity:
        type === "sub"
          ? item?.quantity > 1
            ? item?.quantity - 1
            : 1
          : item?.quantity + 1,
    });
    dispatch(action);
  };

  // };
  return (
    <FormControl
      error={hasError}
      fullWidth
      margin="normal"
      variant="outlined"
      size="small"
    >
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState, formState }) => (
          <Box className={classes.container}>
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(field.value)
                    ? Number.parseInt(field.value) - 1
                    : 1
                );
                handleQuantity("sub");
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <OutlinedInput
              {...field}
              {...fieldState}
              {...formState}
              fullWidth
              id={name}
              value={item ? item.quantity : field.value}
              type="number"
              disabled={disabled}
              className={classes.input}
            />
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(field.value)
                    ? Number.parseInt(field.value) + 1
                    : 1
                );
                handleQuantity("add");
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />

      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
