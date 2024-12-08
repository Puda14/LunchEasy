import { useState } from "react";
import HomeButton from "../../components/HomeButton";
import DishItem from "./components/DishItem";

const Favorite = () => {
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Dish 1",
      rating: 1,
      price: 20,
      restaurant: "AAA",
      description: "abcdefghijklmnopkstuvwxyzzzzzzzzzzzzzzzzz",
    },
    {
      id: 2,
      name: "Dish 2",
      rating: 2,
      price: 20,
      restaurant: "AAA",
      description: "abcdefghijklmnopkstuvwxyz",
    },
    {
      id: 3,
      name: "Dish 3",
      rating: 3,
      price: 20,
      restaurant: "AAA",
      description: "abcdefghijklmnopkstuvwxyz",
    },
    {
      id: 4,
      name: "Dish 4",
      rating: 4,
      price: 20,
      restaurant: "AAA",
      description: "abcdefghijklmnopkstuvwxyz",
    },
    {
      id: 5,
      name: "Dish 5",
      rating: 5,
      price: 20,
      restaurant: "AAA",
      description: "abcdefghijklmnopkstuvwxyz",
    },
  ]);

  const removeDish = (name) => {
    setDishes(dishes.filter((dish) => dish.name !== name));
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">Favorite Dishes</h1>
        <div className="flex flex-wrap gap-4">
          {dishes.map((dish) => (
            <DishItem
              key={dish.id}
              name={dish.name}
              onRemove={removeDish}
              rating={dish.rating}
              price={dish.price}
              restaurant={dish.restaurant}
              description={dish.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
