import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";
import { createDish } from "../../../../services/adminService";
import { getRestaurants } from "../../../../services/adminService";
import { uploadImageToCloudinary } from "../../../../services/uploadService";

const CreateFood = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState({
    name: "",
    ingredients: "",
    calories: "",
    protein: "",
    diet_type: "",
    prep_time: "",
    rating: "",
    price: "",
    description: "",
    images: [],
    restaurant_id: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  // Fetch danh sách nhà hàng khi component mount
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      }
    };

    loadRestaurants();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFoodData((prev) => ({
        ...prev,
        images: [],
      }));
      return;
    }
    try {
      setLoading(true); // Hiển thị trạng thái loading khi upload ảnh

      const imageUrl = await uploadImageToCloudinary(file);

      setFoodData((prev) => ({
        ...prev,
        images: [imageUrl],
      }));
      console.log("Food images:", foodData.images);
    } catch (error) {
      console.error("Image upload failed:", error.message);
      setError("画像のアップロードに失敗しました。");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Creating food:", foodData);
      await createDish(foodData);
      navigate("/admin/food-management"); // Navigate back to food list
    } catch (err) {
      setError(err.message || "Failed to create food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full p-5">
      {/* Back Button */}
      <div className="absolute w-10 top-5 left-5">
        <BackButton dest="/admin/food-management" />
      </div>

      {/* Form Layout */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-3">
        {/* Top Left: Image Upload */}
        <div className="flex flex-col items-center border-r pr-5">
          <h2 className="text-xl font-bold mb-4">料理画像をアップロード</h2>
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
          {foodData.images.length > 0 &&
            foodData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-3/4 h-auto max-w-[400px] max-h-[300px] rounded-lg shadow-md mt-4"
              />
            ))}
        </div>

        {/* Top Right: Name and Ingredients */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">料理名</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            placeholder="料理名を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <label className="font-medium mb-2">材料</label>
          <textarea
            name="ingredients"
            value={foodData.ingredients}
            onChange={handleChange}
            placeholder="材料を入力してください (カンマ区切り)"
            className="w-full mb-4 p-2 border rounded-lg"
            rows="3"
          ></textarea>
        </div>

        {/* Bottom Left: Calories, Protein */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">カロリー (kcal)</label>
          <input
            type="number"
            name="calories"
            value={foodData.calories}
            onChange={handleChange}
            placeholder="カロリーを入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <label className="font-medium mb-2">タンパク質 (g)</label>
          <input
            type="number"
            name="protein"
            value={foodData.protein}
            onChange={handleChange}
            placeholder="タンパク質量を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <label className="font-medium mb-2">評価 (1-5)</label>
          <select
            name="rating"
            value={foodData.rating}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">評価を選択してください</option>
            {Array.from({ length: 9 }, (_, index) => {
              const value = (index + 2) / 2; // 1.0, 1.5, ..., 5.0
              return (
                <option key={value} value={value}>
                  {value.toFixed(1)}
                </option>
              );
            })}
          </select>
        </div>
        {/* Restaurant Selection */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">
            レストランを選択 (Select Restaurant)
          </label>
          <select
            name="restaurant_id"
            value={foodData.restaurant_id}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">レストランを選択してください</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        {/* Bottom Right: Diet Type, Prep Time, Rating, Price */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">ダイエットタイプ</label>
          <select
            name="diet_type"
            value={foodData.diet_type}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">ダイエットタイプを選択してください</option>
            <option value="vegan">ビーガン</option>
            <option value="keto">ケト</option>
            <option value="vegetarian">ベジタリアン</option>
            <option value="other">その他</option>
            <option value="no">指定なし</option>
          </select>
          <label className="font-medium mb-2">調理時間 (分)</label>
          <input
            type="number"
            name="prep_time"
            value={foodData.prep_time}
            onChange={handleChange}
            placeholder="調理時間 を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <label className="font-medium mb-2">価格 (円)</label>
          <input
            type="number"
            name="price"
            value={foodData.price}
            onChange={handleChange}
            placeholder="価格を入力してください"
            className="w-full mb-4 p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <form onSubmit={handleSubmit}>
          {/* Keep your existing form fields */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-6 py-2 bg-orange-400 text-white rounded
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-700"
              }`}
          >
            {loading ? "Creating..." : "料理を作成する"}
          </button>
        </form>
        {/* <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-700 shadow"
        >
          料理を作成する
        </button> */}
      </div>
    </div>
  );
};

export default CreateFood;
