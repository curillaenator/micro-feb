import type { HTMLAttributes } from 'react';

export interface CornerProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  stroke?: number;
  corners?: ('tl' | 'tr' | 'br' | 'bl')[];
}
