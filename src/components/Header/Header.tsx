import React from "react";
import { Header as AhaHeader, Dropdown, Icon } from "@ahaui/react";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
const user = {
  isLogged: false,
};

const Header = () => {
  return (
    <AhaHeader fullWidth className={styles.header}>
      <AhaHeader.Brand>
        <Link to="/">
          <Logo />
        </Link>
      </AhaHeader.Brand>

      <AhaHeader.Main>
        <AhaHeader.Right>
          {user.isLogged && (
            <>
              <Dropdown alignRight className="u-marginLeftExtraSmall">
                <Dropdown.Toggle className="u-textLight u-lineHeightNone">
                  <Icon name="contact" size="medium" />
                </Dropdown.Toggle>
                <Dropdown.Container
                  className={`${styles.dropDownContainerCustom}`}
                >
                  <Dropdown.Item className={styles.dropDownItemCustom}>
                    <Icon name="power" size="small" />
                    <span className="u-marginLeftExtraSmall">Logout</span>
                  </Dropdown.Item>
                </Dropdown.Container>
              </Dropdown>
            </>
          )}

          {!user.isLogged && (
            <div className={styles.authenticationLink}>
              <Link to="/login">Login</Link>
              <Link to="/signup">Register</Link>
            </div>
          )}
        </AhaHeader.Right>
      </AhaHeader.Main>
    </AhaHeader>
  );
};

export default Header;
