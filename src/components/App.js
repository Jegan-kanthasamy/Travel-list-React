import useState from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// main function

export default function App() {
  // This state store the newItem data

  const [addItem, setAddItem] = useState([]);

  // This function is used to get data from previous list using spread operator and get the new items add to an new array

  function addNewItem(items) {
    setAddItem([...addItem, items]);
  }

  function deleteItem(id) {
    setAddItem(removeItem => removeItem.filter(item => item.id !== id));
  }

  function handleToggleOnClick(id) {
    setAddItem(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    let conformation = window.confirm("Do you need to clear the list");

    if (conformation) setAddItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form newItem={addNewItem} />
      <PackingList
        addItem={addItem}
        onDeleteItem={deleteItem}
        onToggle={handleToggleOnClick}
        onClearList={handleClearList}
      />
      <Stats item={addItem} />
    </div>
  );
}
