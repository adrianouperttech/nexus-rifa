import React from 'react';
import { Link } from 'react-router-dom';

const RootPage: React.FC = () => {
  return (
    <div>
      <h1>Root Page</h1>
      <Link to="/">Root</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/subscriptions/new">Assinar</Link>
    </div>
  );
};

export default RootPage;
