// 647. Intro to React Events (onClick already used everywhere)
// 648. Non-Click Events (onChange, onFocus, onBlur, onMouseEnter)
// 649. Working With The Event Object

import { useState } from 'react';

export default function EventPlayground() {
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div>
      <h2>🎛️ Event Playground</h2>

      {/* 648: onChange fires on every keystroke.
          649: the EVENT OBJECT — the `e` passed into the handler.
          e.target   → the element that triggered it (the <input>)
          e.target.value → the current text in that input */}
      <input
        placeholder="Type your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <p>
        {name ? `Hello, ${name}! 👋` : 'Type in the box above (onChange).'}
      </p>

      {/* 635 conditionals driven by event state */}
      <p style={{ color: focused ? 'green' : 'grey' }}>
        {focused ? '✅ Input is focused (onFocus)' : '⬜ Input is not focused (onBlur)'}
      </p>

      {/* 648: mouse events. style below reacts to hover state */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: 10,
          border: '2px dashed #999',
          background: hover ? 'lightyellow' : 'white',
        }}
      >
        {hover ? '🐭 Mouse is inside!' : 'Move your mouse over me.'}
      </div>
    </div>
  );
}
