// 673. Passing Functions As Props
// 674. Passing Functions That Update State
// 675. Practice Passing State-Updating Functions

// A completely DUMB component: it has ZERO state of its own.
// It receives data (totalRolls, isWinner) AND functions (onRoll)
// from the parent. This is the "presentational" component idea:
//   - data down   → props
//   - events up   → call a function the parent gave you
import PropTypes from 'prop-types';

export default function RollControls(props) {
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={props.onRoll}>🎲 Roll the dice</button>
      <button onClick={props.onReset} style={{ marginLeft: 8 }}>
        ↺ Reset
      </button>
      <span style={{ marginLeft: 12 }}>
        Rolls so far: <b>{props.totalRolls}</b>
      </span>
      {props.isWinner && <span style={{ marginLeft: 12 }}>🏆 winner!</span>}
    </div>
  );
}

RollControls.propTypes = {
  onRoll: PropTypes.func.isRequired, // 673: a function as a prop
  onReset: PropTypes.func.isRequired,
  totalRolls: PropTypes.number.isRequired, // 672: state as a prop
  isWinner: PropTypes.bool.isRequired,
};
