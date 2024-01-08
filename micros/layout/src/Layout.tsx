import React, { FC, PropsWithChildren } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './layout.module.scss';

const Layout: FC<PropsWithChildren> = () => {
  return (
    <div className={styles.app}>
      <aside className={styles.aside}></aside>

      <div className={styles.content}>
        <header className={styles.header}>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/about/main'>About</Link>
          <Link to='/about/good'>About good</Link>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
