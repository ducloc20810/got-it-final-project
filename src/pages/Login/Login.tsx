import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "@ahaui/react";
import { useForm } from "react-hook-form";
import { ReactComponent as Logo } from "assets/images/logo-only.svg";
import { useThunkDispatch } from "hooks";
// import {
//   getUserInfo,
//   handleAsyncAction,
//   LOGIN,
//   login,
// } from "redux/actions/user.action";

import styles from "./Login.module.scss";
import { getUserInfoMockSuccess, loginMockSuccess } from "utils/mock";
import { emailPattern } from "utils/variables";
import { InlineError } from "components";

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const handleLoginSubmit = (data: IFormInputs) => {
    if (data.email && data.password) {
      // dispatch(login(data.email, data.password))
      //   .then(() => {
      //     dispatch(getUserInfo());
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      dispatch(loginMockSuccess())
        .then(() => dispatch(getUserInfoMockSuccess))
        .then(() => navigate("/"));
    }
  };

  return (
    <Form
      className={`${styles.login} u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium u-roundedMedium`}
    >
      <Logo
        width={40}
        height={40}
        className="u-marginLeftAuto u-marginRightAuto"
      />
      <h1 className="u-textCenter u-marginTopExtraSmall u-marginBottomMedium u-text800">
        Login to Hello
      </h1>
      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: emailPattern,
          })}
        />

        {errors.email?.type === "required" && (
          <InlineError>Please enter your email</InlineError>
        )}
        {errors.email?.type === "pattern" && (
          <InlineError>Email is invalid</InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
        />

        {errors.password?.type === "required" && (
          <InlineError>Please enter your password</InlineError>
        )}

        {errors.password?.type === "minLength" && (
          <InlineError>Password should be at least 6 characters</InlineError>
        )}
      </Form.Group>

      <Link
        to="/signup"
        className="u-marginLeftAuto u-marginBottomSmall u-textPrimary hover:u-textPrimary hover:u-textUnderline"
      >
        Create account
      </Link>

      <Button
        variant="primary"
        size="large"
        className="u-backgroundPrimary hover:u-background"
        onClick={handleSubmit(handleLoginSubmit)}
      >
        <Button.Label>Login</Button.Label>
      </Button>
    </Form>
  );
};

export default Login;
