import React, { useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import "../App.css";

function HomePage({ onAddCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [isInitial, setisInitial] = useState(false);

  function handleSearch(event) {
    event.preventDefault();

    //if search is empty and user try to search show the entire inital list
    if (searchQuery.length === 0) {
      alert("Please Enter search term");
      // setFilteredFoodList(foodList);
      return;
    }
    console.log(event);
    const filteredPosts = foodList.filter((food) => {
      return `${food.name.toLowerCase()} ${food.ingredients
        .join(" ")
        .toLowerCase()}`.includes(searchQuery.toLowerCase());
    });
    setFilteredFoodList(filteredPosts);
    setisInitial(false);
  }

  useEffect(() => {
    console.log("useEffect");
    async function fetchFoodData() {
      const res = await fetch("http://localhost:8000/food");
      const data = await res.json();
      setFoodList(data);
      setisInitial(true);
    }
    fetchFoodData();
  }, []);

  return (
    <div>
      <Header />
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <FoodList
        // foodList={filteredFoodList.length > 0 ? filteredFoodList : foodList}
        filterList={filteredFoodList}
        initalList={foodList}
        isInitial={isInitial}
        onAddCart={onAddCart}
      />
    </div>
  );
}

function Header() {
  return (
    <div>
      <AppNav />
    </div>
  );
}

function SearchForm({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="search-form-wrapper">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for dishes, ingredients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

function FoodList({ filterList, initalList, isInitial, onAddCart }) {
  // console.log("filter : ", filterList);
  // console.log("inital : ", initalList);
  // console.log(isInitial);
  return (
    <div className="food-list">
      {/* if its inital render and filter list is zero */}
      {isInitial &&
        filterList.length === 0 &&
        initalList.map((food) => (
          <FoodItem key={food.id} food={food} onAddCart={onAddCart} />
        ))}

      {/* if not inital render and filter list is zero */}
      {!isInitial && filterList.length === 0 && (
        <p>No Food Found Please Search Another Food</p>
      )}

      {/* if its inital render and filter list is not zero */}
      {!isInitial &&
        filterList.length !== 0 &&
        filterList.map((food) => (
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
export default HomePage;
