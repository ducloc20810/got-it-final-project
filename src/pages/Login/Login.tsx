import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "@ahaui/react";
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

const Login = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const handleLoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      // dispatch(login(emailRef.current.value, passwordRef.current.value))
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

  // const validate = () => {};

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
        <Form.Input type="text" placeholder="Email" ref={emailRef} />
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input type="password" placeholder="Password" ref={passwordRef} />
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
        onClick={(e) => handleLoginSubmit(e)}
      >
        <Button.Label>Login</Button.Label>
      </Button>
    </Form>
  );
};

export default Login;
