import path from 'path';
import webpack from 'webpack';
import { getWebpackConfig, type CommandsEnvVariables } from '@microfeb/config';

import { dependencies } from './package.json';

export default (env: CommandsEnvVariables) => {
  const config = getWebpackConfig({
    mode: env.mode || 'development',

    port: env.port || 3002,

    // отображать анализатор сборки
    analyze: env.analyze || false,

    // набор глоб js переменных
    // define: {
    //   __PLATFORM__: "desktopb",
    // },

    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'src', 'index.html'),
      output: path.resolve(__dirname, 'build'),
      public: path.resolve(__dirname, 'public'),
      srcAlias: path.resolve(__dirname, 'src'),
    },
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'layout',

      filename: 'remoteEntry.js',

      exposes: {
        './Layout': './src/Layout.tsx',
      },

      shared: {
        ...dependencies,

        react: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react'],
        },

        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-dom'],
        },

        'react-router-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },

        effector: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['effector'],
        },

        'effector-react': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['effector-react'],
        },
      },
    }),
  );

  return config;
};
