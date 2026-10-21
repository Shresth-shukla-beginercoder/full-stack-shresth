// 635. React Conditionals

// The parent owns the state (happy) and passes it down as a prop,
// plus a function to flip it.
export default function Mood(props) {
  return (
    <div>
      <button onClick={props.changeMood}>Switch mood</button>

      {/* Ternary: if happy show one thing, else show another */}
      <p>{props.happy ? '😊 I am happy!' : '🙁 I am sad...'}</p>

      {/* && short-circuit: the right side shows ONLY when happy is true */}
      {props.happy && <p>Party time! 🎉</p>}
    </div>
  );
}
