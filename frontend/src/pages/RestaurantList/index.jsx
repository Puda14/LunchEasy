import React, { useState, useEffect, useMemo } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../../services/restaurantService";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RestaurantRow = React.memo(({ restaurant, onClick }) => (
  <tr
    className="border-b cursor-pointer hover:bg-gray-100"
    onClick={() => onClick(restaurant)}
  >
    <td className="p-2">
      <img
        src={restaurant.images[0]}
        alt={restaurant.name}
        loading="lazy"
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
        className="text-blue-500 underline"
        onClick={(e) => e.stopPropagation()}
      >
        {restaurant.address}
      </a>
    </td>
    <td className="p-2">
      {restaurant.distance ? `${restaurant.distance.toFixed(2)} km` : "N/A"}
    </td>
  </tr>
));

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [locationError, setLocationError] = useState(null);
  const restaurantsPerPage = 10;
  const navigate = useNavigate();

  const getUserLocation = () => {
    console.log("Requesting user location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLocationError(error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocation API not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    getRestaurants();
  }, []);

  const restaurantsWithDistance = useMemo(() => {
    if (!userLocation) return restaurants;

    return restaurants.map((restaurant) => ({
      ...restaurant,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        restaurant.latitude,
        restaurant.longitude
      ),
    }));
  }, [userLocation, restaurants]);

  const sortedRestaurants = useMemo(() => {
    if (!sortConfig.key) return restaurantsWithDistance;

    return [...restaurantsWithDistance].sort((a, b) => {
      if (typeof a[sortConfig.key] === "string") {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      } else {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
    });
  }, [sortConfig, restaurantsWithDistance]);

  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * restaurantsPerPage;
    const endIndex = startIndex + restaurantsPerPage;
    return sortedRestaurants.slice(startIndex, endIndex);
  }, [currentPage, sortedRestaurants]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(sortedRestaurants.length / restaurantsPerPage);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-4 text-3xl font-bold text-center">レストラン検索</h1>
      {locationError && (
        <div className="mb-4 text-red-500">
          <p>エラー: {locationError}</p>
          <button
            onClick={getUserLocation}
            className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            再度位置情報を取得する
          </button>
        </div>
      )}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full border-collapse table-auto">
          <thead className="sticky top-0 bg-white shadow z-10">
            <tr>
              <th className="p-2 text-left border-b">画像</th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  レストラン名
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    ))}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("rating")}
              >
                <div className="flex items-center">
                  評価する
                  {sortConfig.key === "rating" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    ))}
                </div>
              </th>
              <th className="p-2 text-left border-b">アドレス</th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("distance")}
              >
                <div className="flex items-center">
                  半程範圖 (km)
                  {sortConfig.key === "distance" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRestaurants.map((restaurant) => (
              <RestaurantRow
                key={restaurant._id}
                restaurant={restaurant}
                onClick={() => navigate(`/restaurants/${restaurant._id}`)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
          }`}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1 ? "bg-orange-400 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500"
              : "bg-white"
          }`}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
