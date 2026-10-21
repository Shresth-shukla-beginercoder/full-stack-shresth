// 639. Slot Machine Exercise (simplified)

import { useState } from 'react';

export default function SlotMachine() {
  const symbols = ['🍒', '🍋', '🔔', '💎'];
  const [result, setResult] = useState(['?', '?', '?']);

  function spin() {
    const reel = () => symbols[Math.floor(Math.random() * symbols.length)];
    setResult([reel(), reel(), reel()]);
  }

  // 635 conditionals again: all three symbols must match
  const isWinner = result[0] === result[1] && result[1] === result[2];

  return (
    <div>
      <button onClick={spin}>SPIN 🎰</button>
      <h2>{result[0]} {result[1]} {result[2]}</h2>
      {isWinner ? <h3 style={{ color: 'green' }}>YOU WIN!!! 🏆</h3> : null}
    </div>
  );
}
