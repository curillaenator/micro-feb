import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import cn from 'classnames';

import { $game, setCellsP1, setCellsP2 } from '@src/store';

import { getShip1 } from '@src/assets';

import type { CellData } from '@src/types';
import styles from './cell.module.scss';

interface CellProps extends CellData {
  isOnFire?: boolean;
  player: 'p1' | 'p2';
}

export const Cell: FC<CellProps> = (props) => {
  const { x, y, player = 'p1' } = props;
  const pos = `${x}_${y}`;

  const { p1, p2 } = useUnit($game);

  const cellData = player === 'p1' ? p1[pos] : p2[pos];
  const cellHandler = player === 'p1' ? setCellsP1 : setCellsP2;

  const { state } = cellData;

  return (
    <div
      className={cn(styles.cell, {
        [styles.cell_bt]: y > 0,
        [styles.cell_bl]: x > 0,
      })}
      onClick={() => {
        cellHandler(getShip1(pos));
      }}
    >
      <div className={cn(styles.circle, styles[`circle_${state}`])} />
    </div>
  );
};
