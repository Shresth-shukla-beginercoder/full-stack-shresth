// 634. Passing Objects / functions as props

// A child component gets state AND the setter from the parent,
// so the child can update the parent's state.
export default function ObjectPractice(props) {
  return (
    <div>
      <label>
        Parent name:{' '}
        <input
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
        />
      </label>
      <p>Parent says hello to: {props.name}</p>
    </div>
  );
}
