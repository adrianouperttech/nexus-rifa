import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/raffles/results');
        setResults(data);
      } catch (err: any) {
        setError(`Falha ao buscar resultados: ${err.message}`);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="raffle-list">
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.id} className="raffle-item">
            <h3>{result.name}</h3>
            <p>Vencedor: {result.winner}</p>
          </div>
        ))
      ) : (
        <p>Nenhum resultado disponível no momento.</p>
      )}
    </div>
  );
};

export default ResultsPage;
