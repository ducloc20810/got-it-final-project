import React from "react";
import styles from "components/Layout/Layout.module.scss";
import { Header, Sidebar } from "components";
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
