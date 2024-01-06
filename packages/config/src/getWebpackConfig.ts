import webpack from 'webpack';
import { getDevServer } from './getDevServer';
import { getLoaders } from './getLoaders';
import { getPlugins } from './getPlugins';
import type { BuildOptions } from './interfaces';

export const getWebpackConfig = (options: BuildOptions) => {
  const { mode = 'development', paths } = options;

  const fullOptions = {
    ...options,
    isDevMode: mode === 'development',
    isProdMode: mode === 'production',
  };

  const config: webpack.Configuration = {
    mode,

    entry: paths.entry,

    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      publicPath: '/',
      clean: true,
    },

    devServer: getDevServer(fullOptions),

    resolve: {
      alias: { '@src': paths.srcAlias },
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },

    plugins: getPlugins(fullOptions),

    module: { rules: getLoaders(fullOptions) },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    devtool: mode === 'development' ? 'eval-cheap-module-source-map' : 'source-map',
  };

  return config;
};
