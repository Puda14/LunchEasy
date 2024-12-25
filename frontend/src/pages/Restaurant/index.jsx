import { use } from "react";
import React, { useState } from "react";
import { fetchRestaurantById } from "../../services/restaurantService";
import BackButton from "../../components/BackButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import initialData from "../../data/restaurants.json";
import DishItem from "../../components/DishItem";

const Restaurant = () => {
  const {id} = useParams();
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
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute w-10 h-auto top-5 left-5">
        <BackButton dest="/restaurants" />
      </div>

      <div className="flex flex-col w-full h-full pt-20 pl-20 pr-20 text-2xl">
        <div className="flex flex-row w-full h-1/2">
          <div className="flex flex-col items-center w-2/5 h-full pt-4 pl-4 pr-16 text-lg ">
            {restaurant.name}
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="w-5/6 m-2 bg-white h-4/5"
            />
            <div className="text-2xl">..................</div>
          </div>
          <div className="flex flex-col w-3/5 h-full p-3 ">
            <div className="font-bold">冗談</div>
            <div className="grid grid-cols-2">
              <div className="">
                ...................
                <br />
                ...................
                <br />
                ...................
                <br />
              </div>
              <div>
                ...................
                <br />
                ...................
                <br />
                ...................
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-3 grid-rows-2 gap-2 p-2  h-1/2">
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
