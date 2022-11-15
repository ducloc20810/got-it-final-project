import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { SidebarMenu } from "@ahaui/react";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [current, setCurrent] = React.useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles.sidebar}>
      <SidebarMenu
        current={current}
        onSelect={(eventKey) => {
          setCurrent(eventKey);
          navigate(eventKey);
        }}
        className={styles.sidebarMenu}
      >
        <SidebarMenu.Item
          icon="store"
          eventKey="/"
          className={styles.sidebarItem}
        >
          Home
        </SidebarMenu.Item>

        <SidebarMenu.Item
          eventKey="/category"
          className={styles.sidebarItem}
          icon="list"
        >
          Category
        </SidebarMenu.Item>
      </SidebarMenu>
    </div>
  );
};

export default Sidebar;
