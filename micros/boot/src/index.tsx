import React, { FC, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./app";

// import { LazyAbout } from '@src/pages/about';
// import { LazyShop } from '@src/pages/shop';

import "./index.scss";

const Fallback: FC = () => <div>Подождите...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<Fallback />}>
            {/* <LazyAbout /> */}
            <div>About</div>
          </Suspense>
        ),
      },
      // {
      //   path: '/shop',
      //   element: (
      //     <Suspense fallback={<Fallback />}>
      //       <LazyShop />
      //     </Suspense>
      //   ),
      // },
    ],
  },
]);

const root = createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  </React.StrictMode>,
);
