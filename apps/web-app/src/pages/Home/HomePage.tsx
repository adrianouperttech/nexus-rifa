import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';

const HomePage: React.FC = () => {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRaffles = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/raffles/next');
        setRaffles(data);
      } catch (err: any) {
        setError(`Falha ao buscar rifas: ${err.message}`);
      }
      setLoading(false);
    };

    fetchRaffles();
  }, []);

  return (
    <>
      <h1>Próximas Rifas</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="raffle-list">
          {raffles.length > 0 ? (
            raffles.map((raffle) => (
              <div key={raffle.id} className="raffle-item">
                <h3>{raffle.name}</h3>
                <p>{raffle.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma rifa disponível no momento.</p>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
