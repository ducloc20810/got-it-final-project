import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Loader } from "@ahaui/react";
import { useForm } from "react-hook-form";
import { InlineError } from "components";
import { ReactComponent as Logo } from "assets/images/logo-only.svg";
import { useThunkDispatch } from "hooks";
import { emailPattern } from "utils/variables";
import { IFormInputs } from "types/form";
import styles from "./SignUp.module.scss";
import {
  register as myRegister,
  login,
  getUserInfo,
} from "redux/actions/user.action";
import { getUserInfoMockSuccess, loginMockSuccess } from "utils/mock";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const handleLoginSubmit = (data: IFormInputs) => {
    if (data.email && data.password && data.name) {
      setIsLoading(true);
      const { email, name, password } = data;
      //   dispatch(myRegister(name, email, password))
      //     .then(() => dispatch(login(email, password)))
      //     .then(() => dispatch(getUserInfo()))
      //     .then(() => {
      //       setIsLoading(false);
      //       navigate("/");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       setIsLoading(false);
      //     });

      dispatch(myRegister(name, email, password))
        .then(() => dispatch(loginMockSuccess()))
        .then(() => dispatch(getUserInfoMockSuccess()))
        .then(() => navigate("/"))
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form
      className={`${styles.signUp} u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium u-roundedMedium`}
    >
      <Logo
        width={40}
        height={40}
        className="u-marginLeftAuto u-marginRightAuto"
      />
      <h1 className="u-textCenter u-marginTopExtraSmall u-marginBottomMedium u-text800">
        Register to Hello
      </h1>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Your name"
          {...register("name", {
            required: "Name is required",
            maxLength: 30,
          })}
        />

        {errors.name?.type === "required" && (
          <InlineError>Please enter your name</InlineError>
        )}
        {errors.name?.type === "maxLength" && (
          <InlineError>Maximum length of name is 30 characters</InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: emailPattern,
            maxLength: 30,
          })}
        />

        {errors.email?.type === "required" && (
          <InlineError>Please enter your email</InlineError>
        )}
        {errors.email?.type === "pattern" && (
          <InlineError>Email is invalid</InlineError>
        )}

        {errors.email?.type === "maxLength" && (
          <InlineError>Maximum length of email is 30 characters</InlineError>
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
        to="/login"
        className="u-marginLeftAuto u-marginBottomSmall u-textPrimary hover:u-textPrimary hover:u-textUnderline"
      >
        I already have an account
      </Link>

      {!isLoading && (
        <Button
          variant="primary"
          size="large"
          className="u-backgroundPrimary hover:u-background"
          onClick={handleSubmit(handleLoginSubmit)}
        >
          <Button.Label>Login</Button.Label>
        </Button>
      )}
      {isLoading && <Loader className="u-marginAuto" />}
    </Form>
  );
};

export default SignUp;
