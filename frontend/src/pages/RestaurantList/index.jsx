import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import initialData from "../../data/restaurants.json";
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

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

  const handleRowClick = (restaurant) => {
    // convert name to lowercase and replace space with dash
    const id = restaurant.name.toLowerCase().replace(/ /g, "-");
    navigate(`/restaurants/${id}`);
    console.log("Clicked on:", id);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-4 text-3xl font-bold text-center">レストラン検索</h1>
      <table className="min-w-full mt-4 border-collapse table-auto">
        <thead>
          <tr>
            <th className="p-2 border-b"></th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                レストラン名
                {sortConfig.key === "name" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "name" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
                  )}
              </div>
            </th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center">
                評価する
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
                  )}
              </div>
            </th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("distance")}
            >
              <div className="flex items-center">
                半程範圖 (km)
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
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
              onClick={() => handleRowClick(restaurant)}
            >
              <td className="p-2">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="object-cover w-16 h-16 rounded-md"
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
