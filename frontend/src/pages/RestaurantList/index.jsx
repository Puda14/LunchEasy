import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const RestaurantList = () => {
  const initialData = [
    {
      name: "Pizza Place",
      distance: 1.2,
      rating: 4.5,
      imageUrl: "/meal/restaurant.png",
    },
    {
      name: "Burger Town",
      distance: 2.5,
      rating: 4.7,
      imageUrl: "/meal/restaurant.png",
    },
    {
      name: "Sushi World",
      distance: 0.5,
      rating: 4.8,
      imageUrl: "/meal/restaurant.png",
    },
    {
      name: "Pasta Corner",
      distance: 3.1,
      rating: 3.9,
      imageUrl: "/meal/restaurant.png",
    },
  ];

  const [restaurants, setRestaurants] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...restaurants].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setRestaurants(sortedData);
  };

  const handleRowClick = (restaurantName) => {
    // Logic Solving...
    //
    //
    console.log("Clicked on:", restaurantName);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">レストラン検索</h1>
      <table className="min-w-full table-auto border-collapse mt-4">
        <thead>
          <tr>
            <th className="p-2 border-b"></th>
            <th
              className="cursor-pointer p-2 border-b text-left"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                レストラン名
                {sortConfig.key === "name" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className=" text-gray-500" />
                  )}
                {sortConfig.key === "name" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className=" text-gray-500" />
                  )}
              </div>
            </th>
            <th
              className="cursor-pointer p-2 border-b text-left"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center">
                評価する
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className=" text-gray-500" />
                  )}
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className=" text-gray-500" />
                  )}
              </div>
            </th>
            <th
              className="cursor-pointer p-2 border-b text-left"
              onClick={() => handleSort("distance")}
            >
              <div className="flex items-center">
                半程範圖 (km)
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className=" text-gray-500" />
                  )}
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className=" text-gray-500" />
                  )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr
              key={index}
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(restaurant.name)}
            >
              <td className="p-2">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="p-2">{restaurant.name}</td>
              <td className="p-2">{restaurant.rating}</td>
              <td className="p-2">{restaurant.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
