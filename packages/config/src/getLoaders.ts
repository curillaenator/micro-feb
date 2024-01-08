import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { removeDataTestIdPlugin } from './babel/removeDataTestIdPlugin';

import type { ModuleOptions } from 'webpack';
import type { FullBuildOptions } from './interfaces';

export const getLoaders = (options: FullBuildOptions): ModuleOptions['rules'] => {
  const { isDevMode, isProdMode } = options;

  const localIdentName = isDevMode ? '[name]__[local]_[hash:base64:4]' : '[hash:base64:24]';

  const libCss = {
    test: /\.(css)$/i,
    include: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { modules: { localIdentName } },
      },
    ],
  };

  const css = {
    test: /\.(css|scss)$/i,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { modules: { localIdentName } },
      },
      'sass-loader',
    ],
  };

  const assets = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    exclude: /node_modules/,
    type: 'asset/resource',
  };

  const svg = {
    test: /\.(svg)$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: { currentColor: true },
              },
            ],
          },
        },
      },
    ],
  };

  const js = {
    test: /\.(js|jsx|ts|tsx)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: isDevMode ? 'automatic' : 'classic' }],
          ],
          plugins: [
            isDevMode && 'react-refresh/babel',
            isProdMode && [removeDataTestIdPlugin, { props: ['data-testid'] }],
          ].filter(Boolean),
        },
      },
    ],
  };

  return [libCss, css, assets, js, svg];
};
