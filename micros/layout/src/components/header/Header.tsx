import React, { FC } from 'react';
import { useUnit } from 'effector-react';

import { $layout } from '@microfeb/global-stores';

import styles from './header.module.scss';

export const Header: FC = () => {
  const { header } = useUnit($layout);

  return <header className={styles.header}>{header}</header>;
};
