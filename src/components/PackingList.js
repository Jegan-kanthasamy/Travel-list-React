import { useState } from "react";
import Item from "./App";

// PackingList (it shows the items quantity , checkbox and remove item icon )
export default function PackingList({
  addItem,
  onDeleteItem,
  onToggle,
  onClearList,
}) {
  const [sortItem, setSortItem] = useState("item");

  let sortedItems;

  if (sortItem === "item") sortedItems = addItem;
  else if (sortItem === "description") {
    sortedItems = addItem
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = addItem
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(items => (
          <Item
            item={items}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
            key={items.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortItem} onChange={e => setSortItem(e.target.value)}>
          <option value="item">Sort by Item</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
