import React from "react";
import PropTypes from "prop-types";
// import { TextField } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  //   const {
  //     formState: { errors, ...formState },
  //   } = form;
  //   const { touchedFields } = formState;
  const {
    formState: { errors, ...formState },
  } = form;
  // const hasError = touchedFields[name] && errors[name];
  const hasError = errors[name];
  //   console.log(touchedFields[name]);
  //   console.log(errors[name]);
  console.log(errors[name]);
  return (
    <Controller
      name={name}
      control={form.control}
      disabled={disabled}
      //   render={({ field }) => <TextField {...field} />}
      render={({ field, fieldState, formState }) => (
        <TextField
          {...field}
          {...fieldState}
          {...formState}
          variant="outlined"
          margin="normal"
          label={label}
          fullWidth
          error={!!hasError}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

export default InputField;
