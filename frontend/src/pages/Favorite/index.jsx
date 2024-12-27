import { useState } from "react";
import DishItem from "../../components/DishItem";

const Favorite = () => {
  const [dishes, setDishes] = useState([
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 1",
      rating: 1,
      price: 20,
      restaurant: "AAA",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 2",
      rating: 2,
      price: 25,
      restaurant: "BBB",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 3",
      rating: 3,
      price: 30,
      restaurant: "CCC",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 4",
      rating: 4,
      price: 35,
      restaurant: "DDD",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 5",
      rating: 5,
      price: 40,
      restaurant: "EEE",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 6",
      rating: 4,
      price: 22,
      restaurant: "FFF",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 7",
      rating: 3,
      price: 18,
      restaurant: "GGG",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 8",
      rating: 2,
      price: 19,
      restaurant: "HHH",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      _id: "6766456dc202875035f4afc5",
      name: "Dish 9",
      rating: 5,
      price: 28,
      restaurant: "III",
      description: "Lorem ipsum dolor sit amet",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(dishes.length / itemsPerPage);

  // Lấy dữ liệu món ăn hiện tại
  const currentDishes = dishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const removeDish = (name) => {
    setDishes(dishes.filter((dish) => dish.name !== name));
  };

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
              onRemove={removeDish}
              rating={dish.rating}
              price={dish.price}
              restaurant={dish.restaurant}
              description={dish.description}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-3">
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
