import { Form, Button } from "@ahaui/react";
import React from "react";
import styles from "./Login.module.scss";
import { ReactComponent as Logo } from "../../assets/images/logo-only.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Form
      className={`${styles.login} u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium`}
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
        <Form.Input type="text" placeholder="Email" />
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input type="text" placeholder="Password" />
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
      >
        <Button.Label>Login</Button.Label>
      </Button>
    </Form>
  );
};

export default Login;
