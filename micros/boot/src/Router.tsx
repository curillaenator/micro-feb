import { createBrowserRouter } from 'react-router-dom';
import { App } from '@src/app';

//@ts-ignore
import aboutRoutes from 'about/Router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...aboutRoutes],
  },
]);
