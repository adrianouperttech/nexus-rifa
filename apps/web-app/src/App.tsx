import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootRoutes from './pages/Root/RootRoutes';
import LoginRoutes from './pages/Login/LoginRoutes';
import SubscriptionsRoutes from './pages/Subscriptions/SubscriptionsRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<RootRoutes />} />
        <Route path="/login/*" element={<LoginRoutes />} />
        <Route path="/subscriptions/*" element={<SubscriptionsRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
