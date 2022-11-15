import { Form, Button } from "@ahaui/react";
import React from "react";
import styles from "./Login.module.scss";
import { ReactComponent as Logo } from "../../assets/images/logo-only.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Form className={styles.login}>
      <Logo />
      <h1>Login to Hello</h1>
      <Form.Group sizeControl="large">
        <Form.Input type="text" placeholder="Email" />
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input type="text" placeholder="Password" />
      </Form.Group>

      <Link to="/signup">Create account</Link>

      <Button variant="primary" size="large">
        <Button.Label>Login</Button.Label>
      </Button>
    </Form>
  );
};

export default Login;
