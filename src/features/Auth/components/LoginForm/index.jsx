import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/inputField";
import {
  Avatar,
  // Button,
  createTheme,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/material";
import PasswordField from "components/form-control/passwordField";
// import InputField from "../../../../components/form-control/inputField";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#c62828",
    },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    // paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: "#f50057 !important",
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: 0,
    right: 0, //full width
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      identifier: yup
        .string()
        .required("Please enter an email")
        .email("Please enter a valid email address"),
      password: yup.string().required("Please enter a password"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    // console.log("TODO FORM: ", values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values); // wait for this finish = submitting
    }

    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockIcon></LockIcon>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* <form onSubmit={()=>{form.handleSubmit(handleSubmit)}}> */}
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
