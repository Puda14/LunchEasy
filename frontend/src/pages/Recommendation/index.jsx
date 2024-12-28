import React from "react";
import MealList from "../../components/meal-list/MealList";
import { useState, useEffect } from "react";
import { fetchHealthyDishes } from "../../services/dishService";
import { fetchSuggestionDishes } from "../../services/dishService";
const Recommendation = () => {
    const [dishes, setDishes] = useState([]); // Dữ liệu món ăn từ API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
  
    useEffect(() => {
      const loadSuggestionDishes = async () => {
        try {
          setLoading(true);
          setError(null);
  
          // Example params - you can modify based on your needs
          const params = {
            prep_time: 20,
            // Add user location if available
            // latitude: userLat,
            // longitude: userLong,
            // radius: 5
          };
  
          const data = await fetchSuggestionDishes(params);
          setDishes(data);
        } catch (err) {
          console.error('Failed to fetch suggestions:', err);
          setError('Could not load recommendations. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      loadSuggestionDishes();
    }, []);
    return (
      <div className="container p-4 mx-auto relative">
        <h1 className="my-4 text-3xl font-bold text-center">おすすめの料理</h1>
        
        {/* Trạng thái Loading */}
        {loading && (
          <div className="text-center my-4">
            <p className="text-xl">🔄 データをロードしています...</p>
          </div>
        )}
  
        {/* Trạng thái Lỗi */}
        {error && (
          <div className="text-center my-4 text-red-500">
            <p>❌ エラーが発生しました: {error}</p>
          </div>
        )}
  
        {/* Hiển thị danh sách món ăn */}
        {!loading && !error && (
          <MealList dishes={dishes} />
        )}
      </div>
    );
  };

export default Recommendation;
