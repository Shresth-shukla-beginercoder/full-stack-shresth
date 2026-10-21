// 647. Intro to React Events (onClick recap)
// 650. Clicker Exercise

import { useState } from 'react';

// Events are just functions passed to an element:
// onClick, onChange, onFocus, onMouseEnter ...
// The "listener" below runs every time any button is clicked.
export default function Clicker() {
  const [count, setCount] = useState(0);
  // which button was clicked most recently
  const [lastButton, setLastButton] = useState('none yet');

  // one function that works for ALL three buttons
  function handleClick(whichButton) {
    setCount(count + 1);
    setLastButton(whichButton);
  }

  return (
    <div>
      <h2>👆 I've been clicked {count} times</h2>

      {/* 647: when onClick runs a function that has args,
          you must pass it as an arrow function: () => handleClick('red')
          — writing onClick={handleClick('red')} would CALL it
          immediately and pass the event object as whichButton! */}
      <button onClick={() => handleClick('red')} style={{ background: 'salmon' }}>
        red
      </button>{' '}
      <button onClick={() => handleClick('blue')} style={{ background: 'lightblue' }}>
        blue
      </button>{' '}
      <button onClick={() => handleClick('green')} style={{ background: 'lightgreen' }}>
        green
      </button>

      <p>Last button pressed: <b>{lastButton}</b></p>
    </div>
  );
}
