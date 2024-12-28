import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import MealList from "../../components/meal-list/MealList";
import { fetchHistory } from '../../services/historyService';

const History = () => {
  const [dishes, setDishes] = useState([]); // Dữ liệu món ăn từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        var userId = "";
        if (token) {
          const decodedToken = jwtDecode(token);
          userId = decodedToken?.id;
        }
        if (!userId) {
          throw new Error('User ID is missing');
        }

        const data = await fetchHistory(userId);
        console.log(data);
        setDishes(data); // Lưu dữ liệu món ăn
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false); // Dừng trạng thái tải
      }
    };

    loadHistory();
  }, []);
  return (
    <div className="container p-4 mx-auto relative">
      <h1 className="my-4 text-3xl font-bold text-center">🍣 項目選択履歴ページ 🍔</h1>
      
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

export default History;
