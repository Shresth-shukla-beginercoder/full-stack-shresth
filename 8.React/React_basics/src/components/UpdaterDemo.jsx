// 658. Setting State With An Updater Function
// 659. State Initializer Functions
// 660. When Does React Re-Render?

import { useState } from 'react';

export default function UpdaterDemo() {
  // 659: the FIRST argument to useState can be a function.
  // It's called ONCE when the component mounts, and its result
  // becomes the initial state. Use it for expensive calculations
  // (React only runs it on the first render).
  const [random, setRandom] = useState(() =>
    Math.floor(Math.random() * 1000),
  );

  const [n, setN] = useState(0);

  // 658: the two ways to set state:
  //   setN(5)                  → "set it to exactly this"
  //   setN(prev => prev + 1)   → "take the PREVIOUS value and change it"
  //
  // Why bother with the updater form?
  //   660: when state changes, React re-renders the component.
  //   If a click handler (or a timer) updates state MORE THAN ONCE
  //   before the re-render happens, `n` is still the OLD value:
  //       setN(n + 1);  setN(n + 1);   → both read the old n → +1 total
  //       setN(p => p + 1); setN(p => p + 1) → +2, no matter what
  //   The updater form always gets the FRESH value from React's queue.
  function addTwice() {
    setN((prev) => prev + 1);
    setN((prev) => prev + 1); // both land: p always sees the latest
  }

  return (
    <div>
      <h2>🔁 Updater functions</h2>
      <p>
        n = <b>{n}</b>
      </p>
      <button onClick={() => setN(n + 1)}>setN(n + 1)</button>
      <button onClick={addTwice}>two updaters at once (always +2)</button>
      <button onClick={() => setN(0)}>reset</button>

      <p>
        659: random number computed ONCE at start: <b>{random}</b> (reload the
        page to get a new one; re-renders don't re-run the initializer)
      </p>
      <button onClick={() => setRandom(Math.floor(Math.random() * 1000))}>
        New random
      </button>
    </div>
  );
}
