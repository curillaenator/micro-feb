import path from 'path';
import webpack from 'webpack';
import { getWebpackConfig } from '@microfeb/config';

import { REMOTES } from './remotes';
import { dependencies } from './package.json';

interface EnvVariables {
  mode?: 'development' | 'production';
  port?: number;
  analyze?: boolean;
}

export default (env: EnvVariables) => {
  const config = getWebpackConfig({
    mode: env.mode || 'development',

    port: env.port || 3000,

    // отображать анализатор сборки
    analyze: env.analyze || false,

    // набор глоб js переменных
    define: {
      __PLATFORM__: 'desktop',
    },

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
      name: 'boot',
      filename: 'remoteEntry.js',

      remotes: REMOTES,

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
