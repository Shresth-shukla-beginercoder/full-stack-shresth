// 633. Setting Default Prop Values

// The `||` fallback means: if no name is passed, use 'stranger'.
export default function Badge(props) {
  const name = props.name || 'stranger';
  return <span>👋 {name}</span>;
}
