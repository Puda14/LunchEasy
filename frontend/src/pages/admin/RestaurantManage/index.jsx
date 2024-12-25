import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import initialData from "../../../data/restaurants.json";

const AdminRestaurantManage = () => {
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
    const id = restaurant.name.toLowerCase().replace(/ /g, "-");
    navigate(`/restaurants/${id}`);
    console.log("Clicked on:", id);
  };

  const handleDelete = (index) => {
    // TODO: Implement delete functionality
    // API call to delete restaurant
    const updatedRestaurants = restaurants.filter((_, i) => i !== index);
    setRestaurants(updatedRestaurants);
    console.log("Deleted restaurant at index:", index);
  };

  const handleAdd = () => {
    // TODO: Implement add functionality
    // API call to add new restaurant
    console.log("Add new restaurant clicked!");
  };

  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">
        レストランリストの管理
      </h1>
      <div className="overflow-y-auto max-h-[650px] border rounded-md relative">
        <table className="min-w-full mt-0 border-collapse table-auto">
          <thead className="sticky top-0 bg-white shadow">
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
              <th className="p-2 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-100"
              >
                <td className="p-2">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                </td>
                <td className="p-2" onClick={() => handleRowClick(restaurant)}>
                  {restaurant.name}
                </td>
                <td className="p-2" onClick={() => handleRowClick(restaurant)}>
                  {restaurant.rating}
                </td>
                <td className="p-2" onClick={() => handleRowClick(restaurant)}>
                  {restaurant.distance}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end w-full mt-2">
        <button
          onClick={handleAdd}
          className="bg-orange-400 text-white p-3 rounded-full shadow-lg hover:bg-orange-700"
        >
          <FaPlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default AdminRestaurantManage;
