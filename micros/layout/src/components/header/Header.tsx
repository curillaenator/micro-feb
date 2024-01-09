import React, { FC } from 'react';
import { useHeader } from '@microfeb/global-stores';

import { Corners } from '@uikit/smooth-rect';

import styles from './header.module.scss';

export const Header: FC = () => {
  const header = useHeader();

  console.log(header);

  return (
    <header className={styles.header}>
      <button type='button' className={styles.button} style={{ borderRadius: 20 }}>
        <Corners stroke={2} borderRadius={20} />

        <span>Push</span>
      </button>
    </header>
  );
};
