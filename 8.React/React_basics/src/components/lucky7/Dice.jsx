// 670. Building Die and Dice Components — the DICE (a group of them)

// 665 refresher: the parent gives us an ARRAY of face values,
// and .map() turns each number into a <Die>.
import Die from './Die.jsx';

export default function Dice(props) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {props.faces.map((face, index) => (
        <Die key={index} face={face} />
      ))}
    </div>
  );
}
