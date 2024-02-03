import React, { FC } from 'react';
import type { EventCallable } from 'effector';

import { Cell } from '@src/components/cell';

import { FIELD_GENERATOR } from '@src/constants';
import type { CellData } from '@src/types';
import styles from './field.module.scss';

interface FiledProps {
  player: 'p1' | 'p2';
}

export const Field: FC<FiledProps> = (props) => {
  const { player } = props;

  return (
    <div className={styles.field}>
      {FIELD_GENERATOR.map(([pos, data]) => (
        <Cell key={pos} {...data} player={player} />
      ))}
    </div>
  );
};
