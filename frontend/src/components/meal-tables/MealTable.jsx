import React, { useState } from "react";
import PropTypes from "prop-types";
import MealRow from "./MealRow";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const MealTable = ({ meals }) => {
  const [sortedMeals, setSortedMeals] = useState(meals);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...sortedMeals].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setSortedMeals(sortedData);
  };

  return (
    <table className="text-center">
      <thead>
        <tr>
          <th>料理</th>
          <th className="cursor-pointer" onClick={() => handleSort("price")}>
            <div className="flex items-center justify-center">
              価格
              {sortConfig.key === "price" && sortConfig.direction === "asc" && (
                <FaArrowUp className="ml-2 text-gray-500" />
              )}
              {sortConfig.key === "price" &&
                sortConfig.direction === "desc" && (
                  <FaArrowDown className="ml-2 text-gray-500" />
                )}
            </div>
          </th>
          <th className="cursor-pointer" onClick={() => handleSort("meal")}>
            <div className="flex items-center justify-center">
              名前
              {sortConfig.key === "meal" && sortConfig.direction === "asc" && (
                <FaArrowUp className="ml-2 text-gray-500" />
              )}
              {sortConfig.key === "meal" &&
                sortConfig.direction === "desc" && (
                  <FaArrowDown className="ml-2 text-gray-500" />
                )}
            </div>
          </th>
          <th className="cursor-pointer" onClick={() => handleSort("reviews")}>
            <div className="flex items-center justify-center">
              レビュー
              {sortConfig.key === "reviews" &&
                sortConfig.direction === "asc" && (
                  <FaArrowUp className="ml-2 text-gray-500" />
                )}
              {sortConfig.key === "reviews" &&
                sortConfig.direction === "desc" && (
                  <FaArrowDown className="ml-2 text-gray-500" />
                )}
            </div>
          </th>
          <th
            className="cursor-pointer"
            onClick={() => handleSort("cookingTime")}
          >
            <div className="flex items-center justify-center">
              調理時間
              {sortConfig.key === "cookingTime" &&
                sortConfig.direction === "asc" && (
                  <FaArrowUp className="ml-2 text-gray-500" />
                )}
              {sortConfig.key === "cookingTime" &&
                sortConfig.direction === "desc" && (
                  <FaArrowDown className="ml-2 text-gray-500" />
                )}
            </div>
          </th>
          <th className="cursor-pointer" onClick={() => handleSort("address")}>
            <div className="flex items-center justify-center">
              住所
              {sortConfig.key === "address" &&
                sortConfig.direction === "asc" && (
                  <FaArrowUp className="ml-2 text-gray-500" />
                )}
              {sortConfig.key === "address" &&
                sortConfig.direction === "desc" && (
                  <FaArrowDown className="ml-2 text-gray-500" />
                )}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedMeals.map((meal, index) => (
          <MealRow
            key={index}
            meal={meal.meal}
            price={meal.price}
            reviews={meal.reviews}
            cookingTime={meal.cookingTime}
            address={meal.address}
          />
        ))}
      </tbody>
    </table>
  );
};

MealTable.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      meal: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      cookingTime: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MealTable;
