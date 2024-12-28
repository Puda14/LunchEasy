const API_URL = 'http://localhost:5000';

export async function fetchHistory(userId) {
    try {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized')
    }
      const response = await fetch(`${API_URL}/history?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
  
      const historyData = await response.json();

      // Chuyển dữ liệu history thành danh sách dishes
      const dishes = historyData.map((item) => ({
        _id: item.dish_id._id,
        name: item.dish_id.name,
        price: item.dish_id.price,
        rating: item.dish_id.rating,
        prep_time: item.dish_id.prep_time,
        address: item.dish_id.restaurant_id?.address || 'Unknown Address',
        restaurantName: item.dish_id.restaurant_id?.name || 'Unknown Restaurant',
        imageUrl: item.dish_id.images?.[0] || '',
        viewedAt: item.viewed_at,
        description: item.dish_id.description || '',
      }));
  
      return dishes;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  }
  
export async function addToHistory(userId, dishId) {
try {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized')
    }
    const response = await fetch(`${API_URL}/history`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, dishId }),
    });

    if (!response.ok) {
    throw new Error('Failed to add to history');
    }
    console.log("Added to history");
    return await response.json();
} catch (error) {
    console.error('Error adding to history:', error);
    throw error;
}
}