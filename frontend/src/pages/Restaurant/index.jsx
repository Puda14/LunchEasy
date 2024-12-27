import React, { useState, useEffect } from "react";
import { fetchRestaurantById } from "../../services/restaurantService";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";
import DishItem from "./components/DishItem";
import MenuSlider from "./components/MenuSlider";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const data = await fetchRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRestaurant();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="relative flex flex-col w-full h-full p-5">
      {/* Back Button */}
      <div className="absolute w-10 top-5 left-5">
        <BackButton dest="/restaurants" />
      </div>
      {/* Restaurant Information */}
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          {restaurant.name}
        </h1>
        <div className="flex flex-row">
          {/* Left: Image and Address */}
          <div className="w-1/2 flex flex-col items-center">
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="w-3/5 h-auto max-w-[400px] max-h-[300px] rounded-lg shadow-md mb-4"
            />
          </div>

          {/* Right: Details */}
          <div className="w-1/2 flex flex-col px-3">
            <div className="text-lg">
              <p>
                <span className="font-bold">評価:</span> {restaurant.rating}/5
              </p>
              <p>
                <span className="font-bold">料理の数:</span>{" "}
                {restaurant.menu.length}
              </p>
              <p>
                <span className="font-bold">最終更新:</span>{" "}
                {new Date(restaurant.updatedAt).toLocaleString()}
              </p>
              <p>
                <span className="font-bold">アドレス:</span>{" "}
                <a
                  href={restaurant.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline break-words"
                >
                  {restaurant.address}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Section */}{" "}
      <div className="mt-8">
        <MenuSlider menu={restaurant.menu} />
      </div>
    </div>
  );
};

export default Restaurant;
