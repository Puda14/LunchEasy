import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import initialData from "../../../data/restaurants.json";

const AdminRestaurantManage = () => {
  const [restaurants, setRestaurants] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 7; // Number of restaurants per page
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
    const updatedRestaurants = restaurants.filter((_, i) => i !== index);
    setRestaurants(updatedRestaurants);
    console.log("Deleted restaurant at index:", index);
  };

  const handleAdd = () => {
    console.log("Add new restaurant clicked!");
  };

  // Calculate pagination
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
  const startIndex = (currentPage - 1) * restaurantsPerPage;
  const paginatedRestaurants = restaurants.slice(
    startIndex,
    startIndex + restaurantsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">
        レストランリストの管理
      </h1>
      <div className="overflow-x-auto border rounded-md">
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
            {paginatedRestaurants.map((restaurant, index) => (
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
                    onClick={() => handleDelete(startIndex + index)}
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

      {/* Pagination */}
      <div className="flex justify-center mt-2 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
          }`}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1 ? "bg-orange-400 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500"
              : "bg-white"
          }`}
        >
          次へ
        </button>
      </div>

      <div className="flex justify-end w-full">
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
