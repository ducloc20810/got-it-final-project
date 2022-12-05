import React from 'react';
import classNames from 'classnames';
import { Header, Sidebar } from 'components/Common';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={classNames(styles.layout, 'u-screenHeightFull')}>
    <Header />
    {children}
    <Sidebar />
  </div>
);

export default Layout;
