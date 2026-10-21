// 637. Adding Dynamic Component Styles

import { useState } from 'react';

// style={{ }} is "inline" style, and because fontSize comes
// from state, the style changes every time state changes.
export default function StyledBox({ text }) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div>
      <button onClick={() => setFontSize(32)}>Make text BIG</button>
      <button onClick={() => setFontSize(16)}>Make text small</button>
      <div style={{ fontSize: fontSize }}>I am {text} ({fontSize}px)</div>
    </div>
  );
}
