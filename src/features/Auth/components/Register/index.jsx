import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      values.username = values.email;
      const action = register(values);
      //   const user = await dispatch(action).unwrap();
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      console.log("new user:", user);
      enqueueSnackbar("Register successfully", { variant: "success" });
    } catch (error) {
      console.log("Failed to register: ", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
