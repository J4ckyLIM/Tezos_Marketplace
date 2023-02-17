import { RouteObject } from 'react-router-dom';

import { MainLayout } from './components/layouts/MainLayout/MainLayout';
import { HomeView } from './views/home';

export const routes: RouteObject[] = [
  // TODO: Implement missing routes
  // {
  //   path: '/404',
  //   element: <NotFoundView />,
  // },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      // Example of nested route
      // {
      //   path: '/marketplace',
      //   element: <MarketplaceView />,
      // },
    ],
  },
];
