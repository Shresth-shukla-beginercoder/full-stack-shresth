// 661. Working With Objects In State
// 662. Arrays In State
// 663. Generating Ids with UUID

import { useState } from 'react';

// 661: an object CAN be state, but you never MUTATE it.
// "Mutating" = touching properties of the same object (obj.x = ...).
// React doesn't notice that the object's innards changed, so it won't
// re-render. Instead, make a NEW object with the old fields copied over
// using SPREAD (...obj), plus the one thing you want to change.
//
// 663: when you add items to a list, each one needs a UNIQUE id so
// .map() can key it (641) and deletion can find it (664).
// crypto.randomUUID() is built into the browser — no library needed.
export default function UserForm() {
  const [user, setUser] = useState({ name: '', age: 0 });

  // ✅ the React way: brand-new object, old fields preserved
  function updateName(e) {
    setUser({ ...user, name: e.target.value });
  }

  function updateAge(e) {
    setUser({ ...user, age: Number(e.target.value) });
  }

  // an array of "saved users" (662) — next one uses 663/664
  const [saved, setSaved] = useState([]);

  function saveUser() {
    if (user.name === '') return;
    const newUser = { id: crypto.randomUUID(), ...user };
    // 665 common pattern: [...oldArray, newItem] → a NEW array
    setSaved([...saved, newUser]);
    setUser({ name: '', age: 0 }); // reset the form object
  }

  // 664: deleting "the React way" — filter OUT the one you want
  // (filter makes a new array without touching the old one)
  function removeUser(id) {
    setSaved(saved.filter((u) => u.id !== id));
  }

  return (
    <div>
      <h2>🧑 Object + array state</h2>
      <label>
        Name:{' '}
        <input value={user.name} onChange={updateName} />
      </label>
      <label>
        Age:{' '}
        <input value={user.age} onChange={updateAge} />
      </label>
      <button onClick={saveUser}>Save user</button>

      <h3>Saved ({saved.length})</h3>
      <ul>
        {saved.map((u) => (
          // key = the UUID (663) — unique even when names repeat
          <li key={u.id}>
            {u.name}, {u.age}
            <button onClick={() => removeUser(u.id)} style={{ marginLeft: 8 }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
