import { calc } from './helpers';
import type { CornerProps } from '../interfaces';

const PATHS_CACHE = new Map();

export const useCorners = (props: CornerProps) => {
  const { stroke = 0, borderRadius = 14, ...rest } = props;
  const key = `${borderRadius}_${stroke}`;

  if (!PATHS_CACHE.has(key)) PATHS_CACHE.set(key, calc(borderRadius, stroke));

  const { borderPath, path } = PATHS_CACHE.get(key) as { R: number; path: string; borderPath: string };

  return {
    ...rest,
    borderRadius,
    stroke,
    path,
    borderPath,
  };
};
