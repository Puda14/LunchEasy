import { useState, useEffect } from "react";
import DishItem from "../../components/DishItem";
import { fetchFavorites, removeFavorite } from "../../services/favoriteService";
import { jwtDecode } from "jwt-decode";
const Favorite = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    loadFavorites();
  }, []);
  const loadFavorites = async () => {
    try {
      setLoading(true);
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
      const favoriteDishes = await fetchFavorites(userId);
      console.log("Favorite Dishes:", favoriteDishes);
      setDishes(favoriteDishes);
    } catch (err) {
      setError("Failed to load favorites");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const removeDish = async (dishId) => {
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
      console.log("Removing Favorite:", { userId, dishId });
      await removeFavorite(userId, dishId);
      setDishes(dishes.filter((dish) => dish._id !== dishId));
    } catch (err) {
      console.error("Error removing dish:", err);
    }
  };
  const totalPages = Math.ceil(dishes.length / itemsPerPage);

  // Lấy dữ liệu món ăn hiện tại
  const currentDishes = dishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">
          お気に入りの料理
        </h1>
        <div className="flex flex-wrap gap-4">
          {currentDishes.map((dish) => (
            <DishItem
              key={dish._id}
              _id={dish._id}
              name={dish.name}
              onRemove={() => removeDish(dish._id)}
              rating={dish.rating}
              price={dish.price}
              restaurant={dish.restaurantName}
              description={dish.description}
              imageUrl={dish.imageUrl}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300"
            }`}
          >
            前へ
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-orange-400 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300"
            }`}
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
