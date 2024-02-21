import { useState } from "react";
import AppNav from "../components/AppNav";

function Cart({ cartList, onDeleteCart, onQtyChange }) {
  const total = cartList.reduce(
    (acc, initial) => acc + initial.price * initial.quantity,
    0
  );

  console.log(total); // Output: 15

  return (
    <div>
      <AppNav />
      <h1>Cart</h1>
      <div>
        {cartList.map((item) => (
          <CartItem
            key={item.id}
            foodItem={item}
            onQtyChange={onQtyChange}
            onDeleteCart={onDeleteCart}
          />
        ))}
      </div>

      <h3>Total : {total}</h3>
    </div>
  );
}

function CartItem({ foodItem, onQtyChange, onDeleteCart }) {
  const [quantity, setQuantity] = useState(1);

  function handleChange(event) {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    onQtyChange(foodItem, newQuantity); // Pass the updated quantity directly
  }

  console.log(foodItem);
  return (
    <div className="cart-item">
      <span>{foodItem.name}</span>
      <span>{foodItem.price}</span>
      <span>{foodItem.quantity}</span>
      {/* <span>{foodItem.quantity}</span> */}
      <input min={1} type="number" value={quantity} onChange={handleChange} />
      <span onClick={() => onDeleteCart(foodItem)}>❌</span>
    </div>
  );
}

export default Cart;
