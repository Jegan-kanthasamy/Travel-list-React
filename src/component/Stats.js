// Stats function ( it will show how many % of items are packed)
export default function Stats({ item }) {
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
