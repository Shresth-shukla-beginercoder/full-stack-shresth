// 642. The Shopping List Item Component

// A small component for ONE item. The list parent passes:
//  - item:      the string to show
//  - index:     where it sits in the list
//  - removeItem: the parent's function, so the child can ask
//               the parent to remove itself
// (The "key" prop is added in the parent's .map() — you don't
// pass key as a normal prop, React uses it internally. See 641.)
export default function ShoppingListItem(props) {
  return (
    <li>
      {props.item}
      <button
        onClick={() => props.removeItem(props.index)}
        style={{ marginLeft: 10, color: 'red' }}
      >
        ✕ remove
      </button>
    </li>
  );
}
