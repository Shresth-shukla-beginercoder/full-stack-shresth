// 640. Creating A Shopping List Component
// 642. The Shopping List Item Component
// 641. The Key Prop

import { useState } from 'react';
import ShoppingListItem from './ShoppingListItem.jsx';

export default function ShoppingList() {
  const [items, setItems] = useState(['banana', 'bread', 'chicken']);
  const [newItem, setNewItem] = useState('');

  // add whatever the user typed to the list
  function addItem() {
    if (newItem === '') return; // don't add empty items
    setItems([...items, newItem]);
    setNewItem(''); // clear the input
  }

  // 642: the "remove" function that gets passed DOWN to each item.
  // Each item knows its own index, so the parent can remove it.
  function removeItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <div>
      <h2>🛒 Shopping List ({items.length} items)</h2>

      {/* 641: the Key prop — when rendering many items from an
          array, each needs a UNIQUE key so React knows which
          item is which. Here the index is a unique enough key. */}
      <ul>
        {items.map((item, index) => (
          <ShoppingListItem
            key={index}
            item={item}
            index={index}
            removeItem={removeItem}
          />
        ))}
      </ul>

      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add item</button>
    </div>
  );
}
