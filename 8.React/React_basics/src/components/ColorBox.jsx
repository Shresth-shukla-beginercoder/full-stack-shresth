// 655. useState() and Rendering
// 656/657. Color Box Exercise

import { useState } from 'react';

// 655: every time state changes, React re-runs the WHOLE component
// function and updates the page. You never manually "redraw" anything —
// you just change state and the JSX below the hook re-renders with it.
//
// Color Box: the button sets a color into state, and because the
// <div>'s style reads that state, the box recolors automatically.
export default function ColorBox() {
  const [color, setColor] = useState('#ff6b6b');

  const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#7a6ff0', '#f9a8d4'];

  return (
    <div>
      <h2>🎨 Color Box</h2>

      {/* one button per color; clicking one sets state to that color */}
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setColor(c)}
          style={{ background: c, margin: '0 4px' }}
        >
          {c}
        </button>
      ))}

      {/* THE box — its style depends on state, so it re-renders */}
      <div
        style={{
          height: 120,
          width: 200,
          background: color,
          borderRadius: 8,
          margin: '12px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
        }}
      >
        <span>Current color: {color}</span>
      </div>
    </div>
  );
}
