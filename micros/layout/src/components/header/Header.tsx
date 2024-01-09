import React, { FC } from 'react';
import { useHeader } from '@microfeb/global-stores';

import { Button } from '@uikit/button';

import styles from './header.module.scss';

export const Header: FC = () => {
  const header = useHeader();

  return (
    <header className={styles.header}>
      <Button onClick={() => console.log(header)} outline={0}>
        Smoothed corners button
      </Button>
    </header>
  );
};
