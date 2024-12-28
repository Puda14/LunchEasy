import MealList from "../../components/meal-list/MealList";
import { useState, useEffect } from "react";
import { fetchHealthyDishes } from "../../services/dishService";
const HealthyRecommendation = () => {
  const [dishes, setDishes] = useState([]); // Dữ liệu món ăn từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const loadHealthyDish = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu

        const data = await fetchHealthyDishes(); // Gọi API lấy dữ liệu món ăn
        console.log(data);
        setDishes(data); // Lưu dữ liệu món ăn
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false); // Dừng trạng thái tải
      }
    };

    loadHealthyDish();
  }, []);
  return (
    <div className="container p-4 mx-auto relative">
      <h1 className="my-4 text-3xl font-bold text-center">健康食品の提案</h1>
      
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

export default HealthyRecommendation;
