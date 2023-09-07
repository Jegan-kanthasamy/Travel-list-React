import { useState } from "react";

// Form function (which has two states it allow us to get item  from the form and
// get the amount of quantity )
export default function Form({ newItem }) {
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
