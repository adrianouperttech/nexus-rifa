import React from 'react';
import './RaffleCard.css';

interface RaffleCardProps {
  raffle: {
    id: string;
    nome: string;
    descricao: string;
    valor_cota: number;
    max_num: number;
    cotas: any[];
  };
}

const RaffleCard: React.FC<RaffleCardProps> = ({ raffle }) => {
  const sold = raffle.cotas?.length || 0;
  const total = raffle.max_num;
  const progress = total > 0 ? (sold / total) * 100 : 0;

  return (
    <div className="raffle-card">
      <h3>{raffle.nome}</h3>
      <p className="description">{raffle.descricao}</p>
      <div className="price">R$ {raffle.valor_cota.toFixed(2)}</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        {sold} / {total} cotas vendidas
      </div>
    </div>
  );
};

export default RaffleCard;
