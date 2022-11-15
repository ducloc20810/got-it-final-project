import React, { useEffect } from "react";
import { SidebarMenu, Icon, IconType } from "@ahaui/react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
type NavItemsType = Array<{
  id: string;
  icon?: IconType;
  content: string;
  path: string;
}>;

const navItems: NavItemsType = [
  {
    id: "1",
    icon: "store",
    content: "Home",
    path: "/",
  },
  {
    id: "2",
    icon: "list",
    content: "Category",
    path: "/category",
  },
];

const Sidebar = () => {
  const [current, setCurrent] = React.useState("/");
  const [hoverItem, setHoverItem] = React.useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={`${styles.sidebar} u-backgroundPrimaryDarker`}>
      <SidebarMenu
        current={current}
        onSelect={(eventKey) => {
          setCurrent(eventKey);
          navigate(eventKey);
        }}
        className="u-backgroundTransparent u-textWhite u-paddingNone"
      >
        {navItems.map((item) => (
          <SidebarMenu.Item
            key={item.id}
            eventKey={item.path}
            className={` u-backgroundTransparent hover:u-backgroundTransparent `}
          >
            <div
              className="u-flex u-widthFull"
              style={{ gap: "1rem" }}
              onMouseOver={() => setHoverItem(() => item.id)}
              onMouseOut={() => setHoverItem(() => "")}
            >
              <Icon
                name={item.icon}
                className={`${
                  hoverItem === item.id || current === item.path
                    ? "u-textPrimary"
                    : "u-textWhite"
                }`}
              />
              <p
                className={`${
                  hoverItem === item.id || current === item.path
                    ? "u-textPrimary"
                    : "u-textWhite"
                }  u-marginNone`}
              >
                {item.content}
              </p>
            </div>
          </SidebarMenu.Item>
        ))}
      </SidebarMenu>
    </div>
  );
};

export default Sidebar;
