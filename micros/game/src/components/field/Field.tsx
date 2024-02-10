import React, { FC, useState } from 'react';
import { useUnit } from 'effector-react';
import { Cell } from '@src/components/cell';

import { $game, setCellsP1, setCellsP2 } from '@src/store';
import { getOverlayedShip, lastHoveredShipUnhover } from '@src/utils';

import { getShip4 } from '@src/assets';

import { FIELD_GENERATOR } from '@src/constants';
import styles from './field.module.scss';

import type { CellData } from '@src/types';

interface FiledProps {
  player: 'p1' | 'p2';
}

export const Field: FC<FiledProps> = (props) => {
  const { player } = props;

  const { p1, p2 } = useUnit($game);

  const cellHandler = player === 'p1' ? setCellsP1 : setCellsP2;
  const fieldData = player === 'p1' ? p1 : p2;

  const [hoveredCell, setHoveredCell] = useState<CellData>(null);
  const [shipOrientation, setShipOrientation] = useState<'h' | 'v'>('h');
  const [lastHoveredShip, setLastHoveredShip] = useState<Record<string, CellData>>(null);

  const { x, y } = hoveredCell || {};

  const clearLastHoveredShip = () => {
    if (!lastHoveredShip) return;

    cellHandler(lastHoveredShipUnhover(lastHoveredShip, fieldData));
    setLastHoveredShip(null);
  };

  const onShipOrient = () => {
    if (!hoveredCell) return;

    clearLastHoveredShip();
    setShipOrientation((prev) => (prev === 'h' ? 'v' : 'h'));

    const ship = getShip4(`${x}_${y}`, {
      fieldData,
      shipOrientation: shipOrientation === 'v' ? 'h' : 'v',
    });

    if (typeof ship !== 'boolean') {
      const overlayedShip = getOverlayedShip(ship, fieldData);

      setLastHoveredShip(overlayedShip);
      cellHandler(overlayedShip);
    }
  };

  return (
    <div
      tabIndex={0}
      className={styles.field}
      onMouseLeave={() => setHoveredCell(null)}
      onKeyDown={(e) => {
        if (e.code === 'Space') onShipOrient();
      }}
    >
      {FIELD_GENERATOR.map(([pos, data]) => (
        <Cell
          {...data}
          key={pos}
          fieldData={fieldData}
          shipOrientation={shipOrientation}
          setHoveredCell={setHoveredCell}
          lastHoveredShip={lastHoveredShip}
          setLastHoveredShip={setLastHoveredShip}
          cellHandler={cellHandler}
        />
      ))}
    </div>
  );
};
