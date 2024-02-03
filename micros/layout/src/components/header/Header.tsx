import React, { FC } from 'react';
import { useHeader } from '@microfeb/global-stores';

import { Button } from '@uikit/button';

import styles from './header.module.scss';

export const Header: FC = () => {
  const header = useHeader();

  return (
    <header className={styles.header}>
      <Button id='header-test-button' onClick={() => console.log(header)} outline={0}>
        Header button
      </Button>
    </header>
  );
};
