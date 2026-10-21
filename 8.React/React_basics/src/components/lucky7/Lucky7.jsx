// 668. Introducing The Lucky7 Game
// 669. Formulating Our Component Gameplan
// 671. The LuckyN Component
// 672. State As Props

import { useState } from 'react';
import Dice from './Dice.jsx';
import RollControls from './RollControls.jsx';

// 669 GAMEPLAN (the way the course lays it out):
//   1. Die    → dumb, shows one face value            (child, no state)
//   2. Dice   → renders an ARRAY of Die via .map()     (child, no state)
//   3. Lucky7 → the PARENT. Owns ALL the state:
//                - n: how many dice to roll
//                - faces: array of n numbers
//                - totalRolls: how many times we rolled
//              and owns the roll function. It passes state DOWN
//              as props (672) and passes functions DOWN too (673/674).
//   4. RollControls → dumb buttons panel; receives the
//              roll function + numbers to display (673/674/675)
//
// Rule of thumb: STATE lives in the closest PARENT that all the
// pieces needing it can see. Children stay dumb and reusable.

// Roll `count` dice, each face 1-6
function rollAllFaces(count) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * 6) + 1
  );
}

// 634 refresher: small helper to sum an array
const totalOf = (faces) => faces.reduce((sum, f) => sum + f, 0);

export default function Lucky7() {
  // 672: this STATE gets passed down as props to Dice and RollControls
  const [n, setN] = useState(7); // how many dice — pick your own lucky N!
  const [target, setTarget] = useState(7); // the total YOU decide
  const [faces, setFaces] = useState(rollAllFaces(7));
  const [totalRolls, setTotalRolls] = useState(0);

  // 674: a function that UPDATES STATE — the parent writes it,
  // then hands it to a child as a prop (673). The child doesn't
  // know where the state lives; it just calls the function.
  function rollDice() {
    setFaces(rollAllFaces(n));
    setTotalRolls((t) => t + 1); // updater function (658)
  }

  // Change the number of dice → roll fresh faces for the new count
  function changeDieCount(event) {
    const count = Number(event.target.value);
    setN(count);
    setFaces(rollAllFaces(count));
  }

  // The user decides the winning total themselves
  function changeTarget(event) {
    setTarget(Number(event.target.value));
  }

  // Start over: default dice count & target, fresh roll, zero rolls
  function resetAll() {
    setN(7);
    setTarget(7);
    setFaces(rollAllFaces(7));
    setTotalRolls(0);
  }

  // 635: lucky check — the TOTAL of all dice equals the user's target.
  // (Each die shows at least 1, so the total ranges from n up to 6n.
  // A target outside that range can never be won.)
  const total = totalOf(faces);
  const isWinner = total === target;
  const reachable = target >= n && target <= 6 * n;

  return (
    <div>
      <h2>
        🎲 Lucky {n} — roll {n} dice, total exactly {target}!
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
          margin: '8px 0',
        }}
      >
        {/* pick how many dice to use (1-10) */}
        <label>
          Dice to use:{' '}
          <select value={n} onChange={changeDieCount}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>

        {/* the user decides the winning total */}
        <label>
          Target total:{' '}
          <input
            type="number"
            min={n}
            max={6 * n}
            value={target}
            onChange={changeTarget}
            style={{ width: 90 }}
          />
        </label>
      </div>

      {!reachable && (
        <p style={{ color: '#ff6b6b', margin: '4px 0' }}>
          ⚠️ With {n} dice the total can only be between {n} and {6 * n}.
        </p>
      )}

      {/* 672: state, down as a prop */}
      <Dice faces={faces} />

      <p style={{ margin: '8px 0' }}>
        Total: <b>{total}</b> / {target}
      </p>

      {isWinner && reachable && (
        <h3 style={{ color: 'green' }}>
          LUCKY! 🏆 {n} dice, total {total}
        </h3>
      )}

      {/* 673/674: functions (and numbers) down as props */}
      <RollControls
        onRoll={rollDice}
        onReset={resetAll}
        totalRolls={totalRolls}
        isWinner={isWinner}
      />
    </div>
  );
}
