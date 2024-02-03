import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { FullBuildOptions } from './interfaces';

export const getDevServer = (options: FullBuildOptions): DevServerConfiguration | undefined => {
  const { port = 3000, isProdMode } = options;

  if (isProdMode) return undefined;

  return {
    port,
    open: +port === 3000,
    // если раздавать статику через nginx то нужно проксирование на index.html
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  };
};
