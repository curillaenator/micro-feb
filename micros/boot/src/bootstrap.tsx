import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// @ts-ignore
import Layout from 'layout/Layout';
import mfeRoutes from '@src/mfeRoutes';

import './index.scss';

interface LayoutMfeRoute {
  path: string;
  name: string;
  children?: LayoutMfeRoute[];
}

const getLayoutRoutes = (routes: any[]): LayoutMfeRoute[] =>
  routes.map(({ path, name, children }) => ({
    path,
    name,
    children: children ? getLayoutRoutes(children) : undefined,
  }));

const root = document.querySelector('#root');

if (root) {
  const container = createRoot(root);

  container.render(
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <Layout mfeRoutes={getLayoutRoutes(mfeRoutes)} />,
          children: mfeRoutes,
        },
      ])}
      fallbackElement={<div>Подождите...</div>}
    />,
  );
}
