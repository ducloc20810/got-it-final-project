import React from "react";
import styles from "./Sidebar.module.scss";
import { SidebarMenu } from "@ahaui/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [current, setCurrent] = React.useState("/");
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(current);
  }, [current, navigate]);

  return (
    <div className={styles.sidebar}>
      <SidebarMenu
        current={current}
        onSelect={setCurrent}
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
          eventKey="category"
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
