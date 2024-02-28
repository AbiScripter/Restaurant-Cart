import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Cart from "./pages/Cart";

//check https://www.npmjs.com/package/react-toastify
//check https://fkhadra.github.io/react-toastify/introduction/
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartList, setCartList] = useState([]);

  function handleAddToCart(itemToAdd) {
    let isAlreadyPresent = false;
    cartList.forEach((item) => {
      if (item.id === itemToAdd.id) {
        isAlreadyPresent = true;
      }
    });

    if (isAlreadyPresent) {
      toast.warn("Already in the cart ");
    } else {
      toast.success("Added to cart");
    }

    !isAlreadyPresent && setCartList((list) => [...list, itemToAdd]);
  }

  function handleDeleteFromCart(itemToDelete) {
    const cartAfterDeletion = cartList.filter(
      (item) => item.id !== itemToDelete.id
    );
    setCartList(cartAfterDeletion);
  }

  function handleQtyChange(foodItem, quantity) {
    setCartList(
      cartList.map((item) =>
        item.id === foodItem.id ? { ...item, quantity: quantity } : item
      )
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage onAddCart={handleAddToCart} />} />
          <Route path="about" element={<About />} />
          <Route
            path="cart"
            element={
              <Cart
                cartList={cartList}
                onDeleteCart={handleDeleteFromCart}
                onQtyChange={handleQtyChange}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";

// let foodList = [
//   {
//     id: "1",
//     name: "Butter Chicken",
//     price: 350,

//     quantity: 1,
//   },
//   {
//     id: "2",
//     name: "Palak Paneer",
//     price: 300,

//     quantity: 1,
//   },
// ];
// export default function App() {
//   const [foodArr, setFoodArr] = useState(foodList);

//   function handleQtyChange(foodItem, quantity) {
//     setFoodArr(
//       foodArr.map((item) =>
//         item.id === foodItem.id ? { ...item, quantity: quantity } : item
//       )
//     );
//   }

//   const total = foodArr.reduce((acc, ini) => acc + ini.price * ini.quantity, 0);
//   return (
//     <div>
//       {foodArr.map((food) => (
//         <FoodItem key={food.id} foodItem={food} onQtyChange={handleQtyChange} />
//       ))}
//       <h2>Total:{total}</h2>
//     </div>
//   );
// }

// function FoodItem({ foodItem, onQtyChange }) {
//   const [quantity, setQuantity] = useState(1);

//   function handleChange(event) {
//     const newQuantity = Number(event.target.value);
//     setQuantity(newQuantity);
//     onQtyChange(foodItem, newQuantity); // Pass the updated quantity directly
//   }

//   console.log(foodItem);

//   return (
//     <div className="cart-item">
//       <span>{foodItem.name}</span>
//       <span>{foodItem.price}</span>
//       <span>{foodItem.quantity}</span>
//       <span>{foodItem.price * foodItem.quantity}</span>
//       <input min={1} type="number" value={quantity} onChange={handleChange} />
//     </div>
//   );
// }
