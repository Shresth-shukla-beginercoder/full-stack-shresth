// 681. Creating a Shopping List Form
// 682. Shopping List Component
// 683. Finishing The Shopping List Component

import { useState } from 'react';

// Lesson 640 already had us adding items with just an input box.
// 681 upgrades it: a small FORM for name + quantity, 664-style
// deletion, and 665-style array updates when a quantity changes.
export default function ShoppingListForm() {
  // one state object for the form fields (678/680 refresher)
  const [form, setForm] = useState({ name: '', quantity: 1 });

  // 663: every item gets a UUID so we can key it and delete it
  const [list, setList] = useState([]);

  function updateForm(e) {
    const value = e.target.name === 'quantity' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  function addToList(e) {
    e.preventDefault();
    if (form.name === '') return;
    setList([...list, { id: crypto.randomUUID(), ...form }]);
    setForm({ name: '', quantity: 1 }); // reset form
  }

  // 664: delete the React way — filter out the matching id
  function removeItem(id) {
    setList(list.filter((item) => item.id !== id));
  }

  // 666: update ALL matching elements — bump one item's quantity
  function bumpQuantity(id, delta) {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ),
    );
  }

  const totalItems = list.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h2>🛒 Shopping List Form</h2>
      <form onSubmit={addToList}>
        <input
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={updateForm}
        />
        <input
          name="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={updateForm}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity}
            <button onClick={() => bumpQuantity(item.id, 1)} style={{ marginLeft: 6 }}>
              +
            </button>
            <button onClick={() => bumpQuantity(item.id, -1)}>−</button>
            <button
              onClick={() => removeItem(item.id)}
              style={{ marginLeft: 6, color: 'red' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {list.length > 0 && <p>{list.length} kinds, {totalItems} items total</p>}
    </div>
  );
}
