import { FaStar, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DishItem = ({
  name,
  onRemove,
  rating,
  price,
  restaurant,
  description,
  _id,
  imageUrl,
}) => {
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

  const handleClick = () => {
    navigate(`/food/${_id}`);
  };

  return (
    <div className="flex flex-col w-72">
      <div
        onClick={handleClick}
        className="flex flex-col w-72 p-2 mt-2 border border-gray-300 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all"
      >
        <div className="flex flex-row items-center flex-grow gap-2 mb-2">
          <div className="w-1/4">
            <div className="text-center text-xl font-semibold">{name}</div>
          </div>
          <div className="flex-grow flex justify-center items-center">
            <img
              className="max-w-[120px] max-h-[120px] rounded-lg"
              src={imageUrl || "/meal/Burger.png"}
              alt={name}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div
            className={`w-1/4 flex items-center justify-center ${getStarColor(
              rating
            )} text-white rounded-lg p-2 h-6`}
          >
            <FaStar className="mr-1" />
            <span>{rating}</span>
          </div>

          <div className="flex flex-col w-full max-w-[180px]">
            <div className="truncate">
              <span className="font-bold">価格: </span>¥{price}
            </div>
            <div className="truncate">
              <span className="font-bold">レストラン: </span>
              {restaurant}
            </div>
            <div className="truncate">
              <span className="font-bold">説明: </span>
              {description || "説明がありません"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-80 mt-2 items-center">
        <div
          onClick={() => onRemove(name)}
          className="cursor-pointer hover:text-red-600 transition"
        >
          <FaTrash className="text-red-500 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default DishItem;
