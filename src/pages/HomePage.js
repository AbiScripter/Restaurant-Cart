import React, { useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import FoodList from "../components/FoodList";
import SearchForm from "../components/SearchForm";
import "../App.css";

function HomePage({ onAddCart }) {
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  console.log("render home page");

  function handleSearch(searchQuery) {
    const filteredPosts = foodList.filter((food) => {
      return `${food.name.toLowerCase()} ${food.ingredients
        .join(" ")
        .toLowerCase()}`.includes(searchQuery.toLowerCase());
    });
    setFilteredFoodList(filteredPosts);
  }

  useEffect(() => {
    console.log("useEffect");
    async function fetchFoodData() {
      const res = await fetch("http://localhost:8000/food");
      const data = await res.json();
      setFoodList(data);
    }
    fetchFoodData();
  }, []);

  return (
    <div>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      <FoodList
        foodList={filteredFoodList.length > 0 ? filteredFoodList : foodList}
        // foodList={filteredFoodList}
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

export default HomePage;
