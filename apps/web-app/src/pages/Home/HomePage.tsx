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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
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
  );
};

export default HomePage;
