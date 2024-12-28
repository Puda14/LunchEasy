import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import StarsReviewShow from "../../components/star-ratings/StarsReviewShow";
import BackButton from "../../components/BackButton";
import StarsRating from "../../components/star-ratings/StarsRating";
import { fetchDishById } from "../../services/dishService";
import { addToFavorites, fetchFavorites } from "../../services/favoriteService";

const Food = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getDish = async () => {
      try {
        const data = await fetchDishById(id); // Lấy dữ liệu món ăn từ API
        setDish(data);
      } catch (err) {
        setError(err.message || "Failed to fetch dish details");
      } finally {
        setLoading(false);
      }
    };

    getDish();
  }, [id]);
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        var userId = "";
        if (token) {
          const decodedToken = jwtDecode(token);
          userId = decodedToken?.id;
        }
        if (!userId) {
          throw new Error("User ID is missing");
        }
        console.log("Checking favorite status for user:", userId);
        const favorites = await fetchFavorites(userId);
        setIsFavorite(favorites.some((fav) => fav._id === dish._id));
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    if (dish) {
      checkFavoriteStatus();
    }
  }, [dish]);

  const handleFavoriteClick = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      var userId = "";
      if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken?.id;
      }
      if (!userId) {
        throw new Error("User ID is missing");
      }
      await addToFavorites(userId, dish._id);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dish) return <div>No dish found</div>;

  const ingredients = dish.ingredients || [];
  const informationList = [
    { label: "材料名", text: `${dish.name}` },
    { label: "評価する", text: <StarsReviewShow reviews={dish.rating || 0} /> },
    { label: "カロリー", text: `${dish.calories} kcal` },
    { label: "調理時間", text: `${dish.prep_time} 分` },
    { label: "タンパク質", text: `${dish.protein} g` },
    { label: "価格", text: `${dish.price}¥` },
    { label: "ダイエット", text: dish.diet_type || "N/A" },
    {
      label: "レストラン名",
      text: dish.restaurant_id?.name || "N/A",
    },
  ];

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute w-10 h-auto top-5 left-5">
        <BackButton dest={-1} />
      </div>
      <div className="w-4/5 mx-auto">
        {/* Ảnh và 材料 */}
        <div className="flex flex-row items-start mb-10">
          {/* Hình ảnh món ăn */}
          <div className="flex-shrink-0 w-1/2">
            {dish.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Dish ${index + 1}`}
                className="w-full h-50 max-w-[350px] max-h-[250px] object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          {/* 材料 */}
          <div className="ml-10 flex-grow text-xl">
            <p className="font-semibold mb-2">材料</p>
            <div>
              {ingredients.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết món ăn */}
        <div className="grid grid-cols-2 gap-10">
          {informationList.map((info, index) => (
            <div key={index} className="flex flex-row text-xl">
              <p className="font-semibold mr-8">{info.label}</p>
              {typeof info.text === "object" ? info.text : <p>{info.text}</p>}
            </div>
          ))}
        </div>

        {/* Đánh giá */}
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="mt-4">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${
                isFavorite ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>
          </div>
          <div>
            <StarsRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
