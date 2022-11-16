import React from "react";
import { Header, Sidebar } from "components";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${styles.layout} u-screenHeightFull`}>
      <Header />
      {children}
      <Sidebar />
    </div>
  );
};

export default Layout;
