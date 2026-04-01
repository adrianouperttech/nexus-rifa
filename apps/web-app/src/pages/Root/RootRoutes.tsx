import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RootPage from './RootPage';

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
    </Routes>
  );
};

export default RootRoutes;
