// 697. Creating The Application
// 698. The TodoList Component
// 699. Removing Todos
// 700. Toggling Todos
// 701. The New Todo Form
// 702. Adding LocalStorage
// 703. Tweaking the Todo Icons and Ids
// 704. Final Styles

import { useState, useEffect } from 'react';

// The classic "fancy" todo list. Key ideas:
//  - 702: useState can be initialized FROM localStorage, and a
//    useEffect watches todos and writes them BACK — so the list
//    survives a page reload.
//  - 703: crypto.randomUUID() for ids (663), clean icons.

const STORAGE_KEY = 'fancy-todos';

export default function TodoList() {
  // 702: read whatever was saved last time (or start empty).
  // JSON.parse because localStorage only stores STRINGS.
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 702: every time todos change, save the new copy.
  // (708/688 refresher: [todos] means "re-run when todos changes")
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const [newTodo, setNewTodo] = useState('');

  // 701: add from the form (665: spread into a new array)
  function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text: newTodo, done: false }, // 703
    ]);
    setNewTodo('');
  }

  // 700: toggle done — .map() updates just that one element (666)
  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  // 704 (removing, 664): filter out the one matching id
  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div
      style={{
        border: '1px solid #334155',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <h2>
        📋 Todos {remaining > 0 && `— ${remaining} left`}
      </h2>

      {/* 701: the new-todo form */}
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8 }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs doing?"
          style={{ flex: 1, padding: 8, border: '1px solid #cbd5e1', borderRadius: 8 }}
        />
        <button type="submit" style={{ padding: '8px 14px', borderRadius: 8 }}>
          + Add
        </button>
      </form>

      {/* 698: the list */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
        {todos.length === 0 && <li style={{ opacity: 0.5 }}>Nothing yet — add one!</li>}
        {todos.map((todo) => (
          <li
            key={todo.id} // 703: the UUID keeps keys unique
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderBottom: '1px solid #334155',
            }}
          >
            {/* 700: checkbox toggles done */}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.5 : 1,
              }}
            >
              {todo.text}
            </span>
            {/* 704: removal button (703: a clean icon) */}
            <button
              onClick={() => remove(todo.id)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 16,
              }}
              title="Remove"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button onClick={() => setTodos([])} style={{ opacity: 0.6 }}>
          Clear all
        </button>
      )}
    </div>
  );
}
