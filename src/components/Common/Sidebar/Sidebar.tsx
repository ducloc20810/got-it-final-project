import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SidebarMenu, Icon, IconType } from '@ahaui/react';
import styles from './Sidebar.module.scss';

type NavItemsType = Array<{
  id: string;
  icon?: IconType;
  content: string;
  path: string;
  subPath?: string
}>;

const navItems: NavItemsType = [
  {
    id: '1',
    icon: 'store',
    content: 'Home',
    path: '/',
  },
  {
    id: '2',
    icon: 'list',
    content: 'Category',
    path: '/categories',
    subPath: '/items',
  },
];

const Sidebar = () => {
  const [current, setCurrent] = React.useState('/');
  const [hoverItem, setHoverItem] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={classNames(styles.sidebar, 'u-backgroundPrimaryDarker')}>
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
            className=" u-backgroundTransparent hover:u-backgroundTransparent "
          >
            <div
              className="u-flex u-widthFull"
              onFocus={() => setHoverItem(() => item.id)}
              onBlur={() => setHoverItem(() => '')}
            >
              <Icon
                name={item.icon}
                className={classNames(
                  hoverItem === item.id || current === item.path || (item.subPath && current.includes(item.subPath))
                    ? 'u-textPrimary'
                    : 'u-textWhite',
                  current === item.path ? 'u-cursorDefault' : '',
                  'u-marginRightSmall',
                )}
              />
              <p
                className={classNames(
                  hoverItem === item.id || current === item.path || (item.subPath && current.includes(item.subPath))
                    ? 'u-textPrimary'
                    : 'u-textWhite',
                  current === item.path ? 'u-cursorDefault' : '',
                  'u-marginNone',
                )}
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
