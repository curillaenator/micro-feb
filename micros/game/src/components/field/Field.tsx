import React, { FC, useState } from 'react';
import { useUnit } from 'effector-react';
import { Cell } from '@src/components/cell';

import { $game, setCellsP1, setCellsP2 } from '@src/store';
import { getOverlayedShip } from '@src/utils/getOverlayedShip';
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

  const [shipOrientation, setShipOrientation] = useState<'h' | 'v'>('h');
  const [hoveredCell, setHoveredCell] = useState<CellData>(null);
  const [lastHoveredShip, setLastHoveredShip] = useState<Record<string, CellData>>(null);

  const { x, y } = hoveredCell || {};

  const clearLastHoveredShip = () => {
    if (!lastHoveredShip) return;

    const hoveredCells = Object.fromEntries(
      Object.entries(lastHoveredShip).map(([k, v]) => [
        k,
        { ...fieldData[k], state: v.state === 'positive' ? 'transparent' : fieldData[k].state },
      ]),
    );

    cellHandler(hoveredCells);
    setLastHoveredShip(null);
  };

  const onShipOrient = () => {
    if (!hoveredCell) return;

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
        if (e.code === 'Space') {
          clearLastHoveredShip();
          setShipOrientation((prev) => (prev === 'h' ? 'v' : 'h'));
          onShipOrient();
        }
      }}
    >
      {FIELD_GENERATOR.map(([pos, data]) => (
        <Cell
          {...data}
          key={pos}
          player={player}
          shipOrientation={shipOrientation}
          hoveredCell={hoveredCell}
          setHoveredCell={setHoveredCell}
          lastHoveredShip={lastHoveredShip}
          setLastHoveredShip={setLastHoveredShip}
        />
      ))}
    </div>
  );
};
