const API_URL = 'https://luncheasy.onrender.com';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    throw new Error('Unauthorized');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchFavorites = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/favorites?userId=${userId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    const favorites = await response.json();
    return favorites.map(item => ({
      _id: item.dish_id._id,
      name: item.dish_id.name,
      price: item.dish_id.price,
      rating: item.dish_id.rating,
      prep_time: item.dish_id.prep_time,
      address: item.dish_id.restaurant_id?.address || 'Unknown Address',
      restaurantName: item.dish_id.restaurant_id?.name || 'Unknown Restaurant',
      imageUrl: item.dish_id.images?.[0] || '',
      description: item.dish_id.description || '',
    }));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addToFavorites = async (userId, dishId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, dishId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFavorite = async (userId, dishId) => {
    try {
        console.log('Removing Favorite:', { userId, dishId });
      const response = await fetch(`${API_URL}/favorites/remove`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId, dishId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };
