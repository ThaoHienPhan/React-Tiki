import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/inputField";
// import InputField from "../../../../components/form-control/inputField";


TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup
    .object({
      title: yup
        .string()
        .required("Please enter a title")
        .min(5, "Please enter than 5 letters"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    // console.log("TODO FORM: ", values);
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* <form onSubmit={()=>{form.handleSubmit(handleSubmit)}}> */}
      <InputField name="title" label="Todo" form={form} />
    </form>
  );
}

export default TodoForm;
