import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import cn from 'classnames';

import { $game, setCellsP1, setCellsP2 } from '@src/store';
import { getOverlayedShip } from '@src/utils/getOverlayedShip';

import { getShip4 } from '@src/assets';

import type { CellData } from '@src/types';
import styles from './cell.module.scss';

interface CellProps extends CellData {
  player: 'p1' | 'p2';
  shipOrientation: 'h' | 'v';
  hoveredCell: CellData;
  setHoveredCell: React.Dispatch<React.SetStateAction<CellData>>;
  lastHoveredShip: Record<string, CellData> | null;
  setLastHoveredShip: React.Dispatch<React.SetStateAction<Record<string, CellData>>>;
}

export const Cell: FC<CellProps> = (props) => {
  const {
    x,
    y,
    player = 'p1',
    shipOrientation,
    lastHoveredShip,
    // hoveredCell,
    setHoveredCell,
    setLastHoveredShip,
  } = props;
  const pos = `${x}_${y}`;

  const { p1, p2 } = useUnit($game);

  const fieldData = player === 'p1' ? p1 : p2;
  const cellHandler = player === 'p1' ? setCellsP1 : setCellsP2;

  return (
    <div
      className={cn(styles.cell, {
        [styles.cell_bt]: y > 0,
        [styles.cell_bl]: x > 0,
      })}
      onMouseEnter={() => {
        const ship = getShip4(pos, {
          fieldData,
          shipOrientation,
        });

        setHoveredCell(fieldData[pos]);

        if (typeof ship !== 'boolean') {
          const overlayedShip = getOverlayedShip(ship, fieldData);

          setLastHoveredShip(overlayedShip);
          cellHandler(overlayedShip);
        }
      }}
      onMouseLeave={() => {
        if (!lastHoveredShip) return;

        const hoveredCells = Object.fromEntries(
          Object.entries(lastHoveredShip).map(([k, v]) => [
            k,
            { ...fieldData[k], state: v.state === 'positive' ? 'transparent' : fieldData[k].state },
          ]),
        );

        cellHandler(hoveredCells);
        setLastHoveredShip(null);
      }}
      onClick={() => {
        if (!lastHoveredShip) return;

        const clickedCells = Object.fromEntries(
          Object.entries(lastHoveredShip).map(([k, v]) => [
            k,
            { ...v, state: v.state === 'positive' ? 'primary' : 'neutral' },
          ]),
        ) as Record<string, CellData>;

        cellHandler(clickedCells);
        setLastHoveredShip(null);
      }}
    >
      <div className={cn(styles.circle, styles[`circle_${fieldData[pos].state}`])} />
    </div>
  );
};
