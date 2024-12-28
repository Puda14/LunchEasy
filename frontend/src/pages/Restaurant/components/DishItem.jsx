import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; 
import { addToHistory } from '../../../services/historyService';


const DishItem = ({ dish }) => {
  const navigate = useNavigate();

  const getStarColor = (rating) => {
    switch (rating) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const handleClick = async () => {
    try {
      const token = sessionStorage.getItem('token');
      var userId = "";
      if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken?.id;
      }

      if (userId) {
        await addToHistory(userId, dish._id);
      }
      console.log("Added to history:", userId, dish._id);
      navigate(`/food/${dish._id}`);
    } catch (error) {
      console.error('Error adding to history:', error);
      // Still navigate even if history save fails
      navigate(`/food/${dish._id}`);
    }
  };

  return (
    <div className="flex flex-col w-72">
      <div
        onClick={handleClick}
        className="flex flex-col w-72 p-2 mt-2 border border-gray-300 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all"
      >
        <div className="flex flex-row items-center flex-grow gap-2 mb-2">
          <div className="w-1/4">
            <div className="text-center text-sm font-semibold">{dish.name}</div>
          </div>

          <div className="flex-grow flex justify-center items-center">
            <img
              className="h-20 w-30 rounded-lg"
              src={
                dish.images && dish.images[0]
                  ? dish.images[0]
                  : "/meal/default.png"
              }
              alt={dish.name}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div
            className={`w-1/4 flex items-center justify-center ${getStarColor(
              dish.rating
            )} text-white rounded-lg p-2 h-6`}
          >
            <FaStar className="mr-1" />
            <span>{dish.rating.toFixed(1)}</span>
          </div>

          <div className="flex flex-col w-full max-w-[180px]">
            <div className="truncate">
              <span className="font-bold">価格: </span>¥{dish.price.toFixed(2)}
            </div>
            <div className="truncate">
              <span className="font-bold">タイプ: </span>
              {dish.diet_type || "不明"}
            </div>
            <div className="truncate">
              <span className="font-bold">説明: </span>
              {dish.description || "説明がありません"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishItem;
