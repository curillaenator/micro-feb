import { feedData, getNCellShip, findPositions, preventPlacing, getShipMapName } from '@src/utils';
import { CellData } from '@src/types';

const SHIP_MAPS: Record<number, Record<string, CellData[]>> = {
  4: Object.fromEntries([
    ...[0, -1, -2, -3].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(4, offsetY, 'v')]),
    ...[0, -1, -2, -3].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(4, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  3: Object.fromEntries([
    ...[0, -1, -2].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(3, offsetY, 'v')]),
    ...[0, -1, -2].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(3, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  2: Object.fromEntries([
    ...[0, -1].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(2, offsetY, 'v')]),
    ...[0, -1].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(2, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
  1: Object.fromEntries([
    ...[0].map((offsetY) => [`v_${Math.abs(offsetY)}`, getNCellShip(1, offsetY, 'v')]),
    ...[0].map((offsetX) => [`h_${Math.abs(offsetX)}`, getNCellShip(1, offsetX, 'h')]),
  ]) as Record<string, CellData[]>,
};

console.log(SHIP_MAPS);

interface GetShip4Data {
  fieldData: Record<string, CellData>;
  shipOrientation: 'h' | 'v';
  shipSize: number;
}

export const calcShip = (pos: string, data: GetShip4Data): Record<string, CellData> | boolean => {
  const { fieldData, shipOrientation, shipSize } = data;
  const [x, y] = pos.split('_').map((str) => +str);

  const currentShipMap = SHIP_MAPS[shipSize][getShipMapName(x, y, shipSize, shipOrientation, fieldData)];

  const positionedToField = currentShipMap.map(({ x: dX, y: dY }) => findPositions([x, y], [dX, dY]));

  const prevent = preventPlacing(positionedToField, shipSize, fieldData);

  if (prevent.isOwelapedByExistingShip) return false;

  return Object.fromEntries(positionedToField.map(([tX, tY], i) => feedData(currentShipMap, [tX, tY], i)));
};
