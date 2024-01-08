import React, { FC, PropsWithChildren } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Header } from './components/header';

import styles from './layout.module.scss';

interface LayoutProps {
  mfeRoutes: any[];
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ mfeRoutes }) => {
  const navPaths = mfeRoutes.map((route) => route.path) as string[];

  console.log(navPaths);

  return (
    <div className={styles.app}>
      <aside className={styles.aside}>
        <div style={{ height: 96, borderBottom: '1px solid #ffffff' }} />

        <div className={styles.aside_list}>
          <NavLink to='/' className={styles.menuItem}>
            Main
          </NavLink>

          {/* TODO разворачивать path и подпути рекурсивно по входящим роутам */}
          {navPaths.map((navPath) => (
            <NavLink key={navPath} to={navPath} className={styles.menuItem}>
              {navPath}
            </NavLink>
          ))}
        </div>
      </aside>

      <div className={styles.content}>
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
