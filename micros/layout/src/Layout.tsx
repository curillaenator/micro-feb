import React, { FC, PropsWithChildren, Fragment } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Header } from './components/header';

import styles from './layout.module.scss';

interface LayoutMfeRoute {
  path: string;
  name: string;
  children?: LayoutMfeRoute[];
}

interface LayoutProps extends PropsWithChildren {
  mfeRoutes: LayoutMfeRoute[];
}

const Layout: FC<LayoutProps> = ({ mfeRoutes }) => {
  return (
    <div className={styles.app}>
      <aside className={styles.aside}>
        <div style={{ height: 96, borderBottom: '1px solid #ffffff' }} />

        <div className={styles.aside_list}>
          <NavLink to='/' className={styles.menuItem}>
            Main
          </NavLink>

          {/* TODO разворачивать path и подпути рекурсивно по входящим роутам */}
          {mfeRoutes.map(({ name, path, children }) => (
            <Fragment key={path}>
              {!children ? (
                <NavLink to={path} className={styles.menuItem}>
                  {name || path}
                </NavLink>
              ) : (
                children.map((childRoute) => (
                  <NavLink key={`${path}-${childRoute.path}`} to={childRoute.path} className={styles.menuItem}>
                    {childRoute.name || childRoute.path}
                  </NavLink>
                ))
              )}
            </Fragment>
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
