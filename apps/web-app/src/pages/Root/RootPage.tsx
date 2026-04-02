import React, { useEffect } from 'react';
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom';

function getToken() {
  return window.localStorage.getItem('nexus_rifa_token');
}

const RootPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem('nexus_rifa_token');
    navigate('/login');
  };

  return (
    <main className="container">
      <header>
        <div className="brand">Nexus Rifa</div>
        <nav className="tabs">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Próximas Rifas
          </NavLink>
          <NavLink to="/results" className={({ isActive }) => (isActive ? 'active' : '')}>
            Resultados
          </NavLink>
        </nav>
        <div>
            <Link to="/subscriptions/new">Assinar</Link>
            <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Sair</button>
        </div>
      </header>

      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default RootPage;
