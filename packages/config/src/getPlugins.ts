import path from 'path';

import { DefinePlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import type { Configuration } from 'webpack';
import type { FullBuildOptions } from './interfaces';

export const getPlugins = (options: FullBuildOptions): Configuration['plugins'] => {
  const { paths, analyze, define = {}, isDevMode } = options;

  const plugins: Configuration['plugins'] = [
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
      publicPath: '/',
    }),

    new CopyWebpackPlugin({
      patterns: [
        // { from: path.resolve(paths.public, 'fonts'), to: path.resolve(paths.output, 'fonts') },
        // { from: path.resolve(paths.public, 'fonts.css'), to: '' },
        { from: path.resolve(paths.public), to: '' },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),

    // инжект глобальных js переменных
    new DefinePlugin(Object.fromEntries(Object.entries(define).map(([k, v]) => [k, JSON.stringify(v)]))),
  ];

  if (isDevMode) {
    // плагин для Hot Module Replacement
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
