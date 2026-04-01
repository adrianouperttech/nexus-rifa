import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SubscriptionsPage from './SubscriptionsPage';

const SubscriptionsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/subscriptions/new" element={<SubscriptionsPage />} />
    </Routes>
  );
};

export default SubscriptionsRoutes;
