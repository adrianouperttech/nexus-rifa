import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://nexus-rifa.onrender.com').replace(/\/+$/g, '');

function getToken() {
  return window.localStorage.getItem('nexus_rifa_token');
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isAbsolute = /^https?:\/\//i.test(path);
  const normalizedPath = isAbsolute ? path : path.replace(/^\/+/, '');
  const url = isAbsolute
    ? normalizedPath
    : new URL(normalizedPath, `${API_BASE_URL}/`).toString();

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(body || `${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return null;
  return response.json();
}


const RootPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('next-raffles');
  const [raffles, setRaffles] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        if (activeTab === 'next-raffles') {
          const data = await apiFetch('/raffles/next');
          setRaffles(data);
        } else {
          const data = await apiFetch('/raffles/results');
          setResults(data);
        }
      } catch (err: any) {
        setError(`Falha ao buscar dados: ${err.message}`);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  const handleLogout = () => {
    window.localStorage.removeItem('nexus_rifa_token');
    navigate('/login');
  };

  return (
    <main className="container">
      <div className="brand">Nexus Rifa</div>
      <div className="tabs">
        <button onClick={() => setActiveTab('next-raffles')} className={activeTab === 'next-raffles' ? 'active' : ''}>
          Próximas Rifas
        </button>
        <button onClick={() => setActiveTab('results')} className={activeTab === 'results' ? 'active' : ''}>
          Resultados
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Carregando...</p>
      ) : activeTab === 'next-raffles' ? (
        <div className="raffle-list">
          {raffles.map((raffle) => (
            <div key={raffle.id} className="raffle-item">
              <h3>{raffle.name}</h3>
              <p>{raffle.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="raffle-list">
          {results.map((result) => (
            <div key={result.id} className="raffle-item">
              <h3>{result.name}</h3>
              <p>Vencedor: {result.winner}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleLogout}>Sair</button>
      <br />
      <Link to="/subscriptions/new">Assinar</Link>
    </main>
  );
};

export default RootPage;
