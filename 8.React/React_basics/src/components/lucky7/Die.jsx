// 670. Building Die and Dice Components — the DIE

import PropTypes from 'prop-types';

// A Die knows nothing about the game. It's a dumb, reusable
// component: show me a face value (1-6), I'll draw it.
// 672: the face comes in as a PROP, which is just data the
// parent chooses to hand down — including data that came from
// the parent's state.
export default function Die(props) {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; // dice unicode glyphs

  return (
    <span
      style={{
        display: 'inline-block',
        width: 40,
        height: 40,
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: 28,
        background: '#fff',
        border: '2px solid #333',
        borderRadius: 6,
      }}
    >
      {faces[props.face - 1]}
    </span>
  );
}

Die.propTypes = {
  face: PropTypes.number.isRequired, // 1-6
};
