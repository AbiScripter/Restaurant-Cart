function FoodList({ foodList, onAddCart }) {
  return (
    <div className="food-list">
      {foodList.map((food) => (
        <FoodItem key={food.id} food={food} onAddCart={onAddCart} />
      ))}
    </div>
  );
}

function FoodItem({ food, onAddCart }) {
  function handleAdd() {
    console.log(food);
    let cartFood = {
      name: food.name,
      price: food.price,
      id: food.id,
      quantity: food.quantity,
    };

    onAddCart(cartFood);
  }
  return (
    <div className="food-item">
      <p>{food.name}</p>
      <p>{food.price} ₹</p>
      <div>
        {food.ingredients.map((ing, i) => (
          <span key={ing}>
            {`${ing}${food.ingredients.length - 1 !== i ? "," : "."} `}
          </span>
        ))}
      </div>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default FoodList;
