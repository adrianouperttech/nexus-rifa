import React, { useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import './RootPage.css'; 

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
    <div className="root-layout">
      <aside className="sidebar">
        <div className="brand">NEXUS RIFA</div>
        <nav>
          <NavLink to="/" end>
            Próximas Rifas
          </NavLink>
          <NavLink to="/results">
            Resultados
          </NavLink>
          <NavLink to="/subscriptions/new">
            Assinar
          </NavLink>
        </nav>
        <footer className="footer">
          <button onClick={handleLogout}>Sair</button>
        </footer>
      </aside>
      <main className="main-content">
        <div className="content-outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootPage;
