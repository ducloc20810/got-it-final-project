import React from "react";
import styles from "./Layout.module.scss";
import { Header, Sidebar } from "../";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Sidebar />
    </div>
  );
};

export default Layout;
