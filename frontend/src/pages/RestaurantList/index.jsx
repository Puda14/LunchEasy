import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchRestaurants } from "../../services/restaurantService";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLocation = () => {
      console.log("Getting user location...");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation API not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        if (userLocation) {
          const restaurantsWithDistance = data.map((restaurant) => {
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              restaurant.latitude,
              restaurant.longitude
            );
            console.log('Distance:', distance);
            return { ...restaurant, distance };
          });
          setRestaurants(restaurantsWithDistance);
        } else {
          setRestaurants(data);
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    getRestaurants();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...restaurants].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setRestaurants(sortedData);
  };

  const handleRowClick = (restaurant) => {
    // convert name to lowercase and replace space with dash
    const id = restaurant._id;
    navigate(`/restaurants/${id}`);
    console.log("Clicked on:", id);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-4 text-3xl font-bold text-center">レストラン検索</h1>
      <table className="min-w-full mt-4 border-collapse table-auto">
        <thead>
          <tr>
            <th className="p-2 border-b"></th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                レストラン名
                {sortConfig.key === "name" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "name" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
                  )}
              </div>
            </th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center">
                評価する
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "rating" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
                  )}
              </div>
            </th>
            <th>アドレス</th>
            <th
              className="p-2 text-left border-b cursor-pointer"
              onClick={() => handleSort("distance")}
            >
              <div className="flex items-center">
                半程範圖 (km)
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "asc" && (
                    <FaArrowUp className="text-gray-500 " />
                  )}
                {sortConfig.key === "distance" &&
                  sortConfig.direction === "desc" && (
                    <FaArrowDown className="text-gray-500 " />
                  )}
              </div>
            </th>

          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr
              key={restaurant._id}
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(restaurant)}
            >
              <td className="p-2">
                <img
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  className="object-cover w-16 h-16 rounded-md"
                />
              </td>
              <td className="p-2">{restaurant.name}</td>
              <td className="p-2">{restaurant.rating}</td>
              <td className="p-2">
                <a
                  href={restaurant.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to go to map"
                  style={{ textDecoration: 'underline', color: 'black' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {restaurant.address}
                </a>
              </td>
              <td className="p-2">{restaurant.distance ? `${restaurant.distance.toFixed(2)} km` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
