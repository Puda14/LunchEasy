import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import dishes from "../../data/dishes.json";

const MealList = ({ apiEndpoint }) => {
  const [data, setData] = useState(dishes);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    // TODO: Fetch data from API
    const fetchData = async () => {
      if (apiEndpoint) {
        try {
          console.log(`Fetching data from API: ${apiEndpoint}`);
          // const response = await fetch(apiEndpoint);
          // const result = await response.json();
          // setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setData(sortedData);
  };

  const handleRowClick = (dish) => {
    //TODO: Implement row click
    console.log("Row clicked:", dish);
  };

  return (
    <div className="overflow-y-auto max-h-[650px] border rounded-md relative">
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
              onClick={() => handleSort("reviews")}
            >
              <div className="flex items-center">
                レビュー
                {sortConfig.key === "reviews" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "reviews" &&
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
          </tr>
        </thead>
        <tbody>
          {data.map((dish, index) => (
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
              <td className="p-2">{dish.reviews} ⭐</td>
              <td className="p-2">{dish.cookingTime}</td>
              <td className="p-2">{dish.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealList;
