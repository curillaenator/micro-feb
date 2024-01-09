import { RADIUS_Q_ADD, RADIUS_Q_MULT, BEZIER_Q } from '../constants';

export const calc = (R: number, stroke: number) => {
  // параметр (от 0 до 1) для координат положения управляющих точек безье в иконке
  // чем меньше BEZIER_Q, тем более "острый" будет уголок
  const S = BEZIER_Q * ((R - RADIUS_Q_ADD) / RADIUS_Q_MULT);

  // смещение borderPath от края на половину ширины бордера из-за специфики построения stroke по path
  const I = stroke / 2;

  const path = `M 0 ${R} C 0 ${S} ${S} 0 ${R} 0 V ${R} Z`;
  const borderPath = `M ${I} ${R} C ${I} ${S} ${S} ${I} ${R} ${I}`;

  return {
    R,
    path,
    borderPath,
  };
};
