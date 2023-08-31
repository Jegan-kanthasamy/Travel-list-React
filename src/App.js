import { useState } from "react";

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
  return (
    <div className="app">
      <Logo />
      <Form newItem={addNewItem} />
      <PackingList
        addItem={addItem}
        onDeleteItem={deleteItem}
        onToggle={handleToggleOnClick}
      />
      <Stats item={addItem} />
    </div>
  );
}

// Logo function (only logo no functionality)

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

// Form function (which has two states it allow us to get item  from the form and
// get the amount of quantity )

function Form({ newItem }) {
  const [description, setDescription] = useState("");

  const [quantity, setQuantity] = useState(1);

  // This function prevent the default functionality of a form

  function handleSubmit(e) {
    e.preventDefault();

    //  creating a condition to create new object

    if (!description) return;

    const newList = {
      description,
      quantity,
      packed: false,
      id: Math.floor(Math.random() * (101 - 1) + 1),
    };

    newItem(newList);

    // Updating the input box and quantity to starting stage

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip </h3>

      <select
        value={quantity} // Setting the default to state
        onChange={e => setQuantity(Number(e.target.value))} // setting state to get value from input to react while  change
      >
        {/* Array.form() is used to create an array of 20 num and it is stored in option element */}

        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option type={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Getting the data from input box */}

      <input
        type="text"
        placeholder="add list..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button>Submit</button>
    </form>
  );
}

// PackingList (it shows the items quantity , checkbox and remove item icon )

function PackingList({ addItem, onDeleteItem, onToggle }) {
  return (
    <div className="list">
      <ul>
        {addItem.map(items => (
          <Item
            item={items}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
            key={items.id}
          />
        ))}
      </ul>
    </div>
  );
}

// item function (it  is used to be as child comp. of PackingList function to create elements)

function Item({ item, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggle(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : null}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Stats function ( it will show how many % of items are packed)

function Stats({ item }) {
  if (!item.length) {
    return (
      <p className="stats">
        <em>Get started to pack the item.</em>
      </p>
    );
  }

  const numItem = item.length;
  const itemPacked = item.filter(items => items.packed === true).length;
  const percentage = Math.round((itemPacked / numItem) * 100);

  return (
    <footer className="stats">
      <em>
        {itemPacked === numItem
          ? `You've packed all the item in the list ✈`
          : `You have ${numItem} item in your list, and you already packed ${itemPacked} (${percentage}%).`}
      </em>
    </footer>
  );
}
