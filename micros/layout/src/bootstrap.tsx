import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@src/Layout';

// bootstrap independent router
export const router = createBrowserRouter([
  {
    path: '/*',
    element: <Layout mfeRoutes={[]} />,
  },
]);

const root = document.querySelector('#root');

if (root) {
  const container = createRoot(root);
  container.render(<RouterProvider router={router} fallbackElement={<div>Подождите...</div>} />);
}
