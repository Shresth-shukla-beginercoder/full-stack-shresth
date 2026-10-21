// 667. Score Keeper Exercise

import { useState } from 'react';

// Track two players' scores with updater functions (658) so
// rapid clicks never read a stale value.
export default function ScoreKeeper() {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  return (
    <div>
      <h2>🏆 Score Keeper</h2>

      <div style={{ display: 'flex', gap: 20, textAlign: 'center' }}>
        <div>
          <h3>Player 1</h3>
          <p style={{ fontSize: 40, margin: 0 }}>{player1}</p>
          <button onClick={() => setPlayer1((p) => p + 1)}>+1</button>
          <button onClick={() => setPlayer1(0)}>reset</button>
        </div>
        <div>
          <h3>Player 2</h3>
          <p style={{ fontSize: 40, margin: 0 }}>{player2}</p>
          <button onClick={() => setPlayer2((p) => p + 1)}>+1</button>
          <button onClick={() => setPlayer2(0)}>reset</button>
        </div>
      </div>

      {/* 635 conditional on the state */}
      {player1 === player2 ? (
        <p>Tie game! 🤝</p>
      ) : (
        <p>{player1 > player2 ? 'Player 1' : 'Player 2'} is winning! 🎉</p>
      )}
    </div>
  );
}
