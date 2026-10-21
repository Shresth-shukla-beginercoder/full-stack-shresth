// 634. Passing Arrays / 638. Rendering Arrays With Map

// An array is passed in as a prop. .map() turns each item
// into a <li>. `key` helps React track which item is which.
export default function FruitList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
