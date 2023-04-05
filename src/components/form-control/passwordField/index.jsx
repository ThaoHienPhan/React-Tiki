import React, { useState } from "react";
import PropTypes from "prop-types";
// import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const { form, name, label, disabled } = props;
  const {
    formState: { errors, ...formState },
  } = form;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        //   render={({ field }) => <TextField {...field} />}
        render={({
          field,
          fieldState,
          formState,

          name,
        }) => (
          <OutlinedInput
            {...field}
            {...fieldState}
            {...formState}
            label={label}
            fullWidth
            id={name}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
          />
        )}
      />
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
