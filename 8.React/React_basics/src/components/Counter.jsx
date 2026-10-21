// 651. Introducing State
// 652. Working With The useState() Hook

import { useState } from 'react';

// The classic first state example: a counter.
// `count` is state, `setCount` is the only way to change it.
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>🔢 Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      {/* set it to a specific value, not just +1 */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
