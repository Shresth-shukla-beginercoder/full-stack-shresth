// 651. Introducing State
// 652. Working With The useState() Hook
// 653. Creating a Toggler Component

import { useState } from 'react';

// STATE vs PROPS (651):
//   props  → data that comes IN from the parent (can't change it here)
//   state  → data that lives INSIDE this component and can change over
//            time. When state changes, React re-renders the component
//            and the whole UI updates automatically (that's 655).
//
// useState does two things:
//   1. creates a piece of state, starting at the value you give it
//   2. returns it as a pair:  [the value, the function that updates it]
//
//   const [isOn, setIsOn] = useState(false)
//        ^^^^^^   ^^^^^^^^
//   read the value anywhere in JSX; call the setter with the NEW value.
export default function Toggler() {
  // 654: a component can have MULTIPLE pieces of state —
  // each useState() call is completely independent.
  const [isOn, setIsOn] = useState(false); // state #1
  const [count, setCount] = useState(0); // state #2

  return (
    <div>
      <h2>
        ⚡ Light switch: {isOn ? 'ON 💡' : 'OFF'}
      </h2>

      {/* passing TRUE / FALSE directly... */}
      <button onClick={() => setIsOn(true)}>Turn ON</button>
      <button onClick={() => setIsOn(false)}>Turn OFF</button>

      {/* ...or the classic "toggler": flip the current value */}
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>

      {/* each piece of state drives its own part of the UI */}
      <p>
        Switch has been toggled <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          setIsOn(!isOn);
          setCount(count + 1); // two setters can run in one handler
        }}
      >
        Toggle + count it
      </button>
    </div>
  );
}
