// 665. Common Array Updating Patterns
// 666. Updating All Elements In An Array

import { useState } from 'react';

// These are the "swiss army knife" moves for arrays in state.
// Every one returns a NEW array — never touch the original.
export default function ArrayPatterns() {
  const [nums, setNums] = useState([1, 2, 3, 4, 5]);
  const [tasks, setTasks] = useState([
    { text: 'laundry', done: false },
    { text: 'groceries', done: false },
  ]);

  // 666: update EVERY element — .map() over the array, change the
  // thing you care about, return it. Nothing outside the map is touched.
  function doubleAll() {
    setNums(nums.map((n) => n * 2));
  }

  // 666 applied to objects in an array: change ONE task's flag
  function toggleTask(index) {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    );
  }

  return (
    <div>
      <h2>🧮 Array patterns — nums: [{nums.join(', ')}]</h2>

      <button onClick={() => setNums([...nums, nums.length + 1])}>
        push → [...nums, x]
      </button>
      <button onClick={() => setNums(nums.slice(1))}>drop first → slice(1)</button>
      <button onClick={doubleAll}>double everything → .map()</button>
      <button onClick={() => setNums([1, 2, 3, 4, 5])}>reset</button>

      <h2>✅ tasks</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={t.text}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(i)}
            />{' '}
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
              {t.text}
            </span>
          </li>
        ))}
      </ul>
      <button onClick={() => setTasks(tasks.map((t) => ({ ...t, done: true })))}>
        666: mark ALL done
      </button>
    </div>
  );
}
