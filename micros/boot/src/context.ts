import { createContext } from 'react';

interface BootContext {
  mfeRoutes?: any[];
}

export const $bootContext = createContext<BootContext>({});
