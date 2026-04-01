import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

const LoginRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default LoginRoutes;
