import React, { useState } from "react";
import BackButton from "../../../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../../../../services/adminService";
const CreateRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    latitude: null,
    longitude: null,
    address: "",
    rating: "",
    mapUrl: "",
    images: [],
  });

  const extractLatLongFromURL = (url) => {
    try {
      // Tìm ký tự @ và lấy phần sau nó
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  
      if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
  
        return { latitude, longitude };
      }
  
      // Nếu không tìm thấy @, thử tìm bằng 3d và 4d
      const altMatch = url.match(/3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (altMatch) {
        const latitude = parseFloat(altMatch[1]);
        const longitude = parseFloat(altMatch[2]);
  
        return { latitude, longitude };
      }
  
      throw new Error('Latitude and Longitude not found in URL');
    } catch (error) {
      console.error('Error extracting coordinates:', error.message);
      return null;
    }
  }


  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRestaurantData((prev) => ({
          ...prev,
          images: [reader.result],
        }));
      };
    } else {
      setRestaurantData((prev) => ({
        ...prev,
        images: [],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Trích xuất Latitude và Longitude từ mapUrl
    const coordinates = extractLatLongFromURL(restaurantData.mapUrl);
    if (!coordinates) {
      setError("マップURLが無効です。緯度と経度を抽出できません。");
      setLoading(false);
      return;
    }

    // Cập nhật latitude và longitude vào restaurantData
    const updatedData = {
      ...restaurantData,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    const { name, address,latitude, longitude, rating, mapUrl, images } = updatedData;

    if (!name || !address || !latitude||!longitude || !rating || !mapUrl || images.length === 0) {
      setError(
        "すべての情報を入力し、少なくとも1枚の画像をアップロードしてください!"
      );
      return;
    }
    try {
      console.log("Creating restaurant:", updatedData);
      await createRestaurant(updatedData);
      navigate("/admin/restaurant-management"); // Navigate back to restaurant list
    }catch (err) {
      setError(err.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
    alert(
      `追加されたレストラン情報:\n${JSON.stringify(restaurantData, null, 2)}`
    );
  };


  return (
    <div className="relative flex flex-col w-full h-full p-5">
      {/* Back Button */}
      <div className="absolute w-10 top-5 left-5">
        <BackButton dest="/admin/restaurant-management" />
      </div>

      {/* Form Layout */}
      <div className="flex flex-row w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-3">
        {/* Left Column: Image Upload */}
        <div className="w-1/2 flex flex-col items-center border-r pr-5">
          <h2 className="text-xl font-bold mb-4">
            レストラン画像をアップロード
          </h2>
          {/* Custom Upload Button */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-orange-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-700"
          >
            画像を選択する
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {/* File preview */}
          {restaurantData.images.length > 0 && (
            <img
              src={restaurantData.images[0]}
              alt="Preview"
              className="w-3/4 h-auto max-w-[400px] max-h-[300px] rounded-lg shadow-md mt-4"
            />
          )}
        </div>

        {/* Right Column: Form Inputs */}
        <div className="w-1/2 flex flex-col pl-5">
          <h2 className="text-xl font-bold mb-4">レストラン情報</h2>

          {/* Name Input */}
          <label className="font-medium mb-2">レストラン名</label>
          <input
            type="text"
            name="name"
            value={restaurantData.name}
            onChange={handleChange}
            placeholder="レストラン名を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Address Input */}
          <label className="font-medium mb-2">住所</label>
          <input
            type="text"
            name="address"
            value={restaurantData.address}
            onChange={handleChange}
            placeholder="住所を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Rating Input */}
          <label className="font-medium mb-2">評価 (1-5)</label>
          <select
            name="rating"
            value={restaurantData.rating}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">評価を選択してください</option>
            <option value="1">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5">5.0</option>
          </select>

          {/* Map URL Input */}
          <label className="font-medium mb-2">地図URL</label>
          <input
            type="text"
            name="mapUrl"
            value={restaurantData.mapUrl}
            onChange={handleChange}
            placeholder="地図のURLを入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Error Display */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full p-3 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-700"
          >
            レストランを作成する
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
