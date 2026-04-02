import { RouteObject } from 'react-router-dom';
import ResultsPage from './ResultsPage';

export const ResultsRoutes: RouteObject[] = [
  {
    path: '/results',
    element: <ResultsPage />,
  },
];
