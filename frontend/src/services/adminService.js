const API_URL = 'http://localhost:5000';

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

// Dish Management
export const getDishes = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/dishes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch dishes');

    const data = await response.json();
    const dishes = data.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      rating: item.rating,
      prep_time: item.prep_time,
      address: item.restaurant_id?.address || 'Unknown Address',
      restaurantName: item.restaurant_id?.name || 'Unknown Restaurant',
      imageUrl: item.images?.[0] || '',
      description: item.description || '',
    }));
    return dishes;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getDishById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/dishes/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch dish');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createDish = async (dishData) => {
  try {
    const response = await fetch(`${API_URL}/admin/dishes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(dishData),
    });
    if (!response.ok) throw new Error('Failed to create dish');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateDish = async (id, dishData) => {
  try {
    const response = await fetch(`${API_URL}/admin/dishes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(dishData),
    });
    if (!response.ok) throw new Error('Failed to update dish');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/dishes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete dish');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Restaurant Management
export const getRestaurants = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/restaurants`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch restaurants');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/restaurants/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch restaurant');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createRestaurant = async (restaurantData) => {
  try {
    const response = await fetch(`${API_URL}/admin/restaurants`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(restaurantData),
    });
    if (!response.ok) throw new Error('Failed to create restaurant');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateRestaurant = async (id, restaurantData) => {
  try {
    const response = await fetch(`${API_URL}/admin/restaurants/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(restaurantData),
    });
    if (!response.ok) throw new Error('Failed to update restaurant');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/restaurants/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete restaurant');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// User Management
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};