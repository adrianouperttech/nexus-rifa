import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import RaffleCard from './RaffleCard';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRaffles = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/rifas');
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
        <div className="raffle-grid">
          {raffles.length > 0 ? (
            raffles.map((raffle) => (
              <RaffleCard key={raffle.id} raffle={raffle} />
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
