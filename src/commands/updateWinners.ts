import { db } from '../db';

export const handleUpdateWinners = () => {
  const winners = db.winners;

  const response = {
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  };

  return response;
};
