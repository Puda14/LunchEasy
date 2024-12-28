import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import initialData from "../../../data/dishes.json";

const FoodManage = () => {
  const [dishes, setDishes] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const dishesPerPage = 7; // Number of dishes per page
  const navigate = useNavigate();

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...dishes].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setDishes(sortedData);
  };

  const handleDelete = (index) => {
    const updatedDishes = dishes.filter((_, i) => i !== index);
    setDishes(updatedDishes);
    console.log("Deleted dish at index:", index);
  };

  const handleAdd = () => {
    navigate(`/admin/food-management/create`);
    console.log("Add new dish clicked!");
  };

  const handleRowClick = (dish) => {
    console.log("Dish clicked:", dish);
    navigate(`/food/${dish._id.toLowerCase().replace(/ /g, "-")}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(dishes.length / dishesPerPage);
  const startIndex = (currentPage - 1) * dishesPerPage;
  const paginatedDishes = dishes.slice(startIndex, startIndex + dishesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">料理管理</h1>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full mt-0 border-collapse table-auto">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="p-2 border-b"></th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("meal")}
              >
                <div className="flex items-center">
                  料理名
                  {sortConfig.key === "meal" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "meal" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  価格
                  {sortConfig.key === "price" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "price" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("cookingTime")}
              >
                <div className="flex items-center">
                  調理時間 (分)
                  {sortConfig.key === "cookingTime" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "cookingTime" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("address")}
              >
                <div className="flex items-center">
                  位置
                  {sortConfig.key === "address" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "address" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th className="p-2 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedDishes.map((dish, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(dish)}
              >
                <td className="p-2">
                  <img
                    src={dish.imageUrl}
                    alt={dish.meal}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                </td>
                <td className="p-2">{dish.meal}</td>
                <td className="p-2">{dish.price}</td>
                <td className="p-2">{dish.cookingTime}</td>
                <td className="p-2">{dish.address}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(startIndex + index);
                    }}
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

export default FoodManage;
