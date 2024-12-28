const API_URL = 'http://localhost:5000';

export const fetchDishes = async () => {
  try {
    const response = await fetch(`${API_URL}/dishes`);
    if (!response.ok) {
      throw new Error('Failed to fetch dishes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};

export const fetchDishById = async (id) => {
  try {
    // var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Unauthorized');
    // }
    const response = await fetch(`${API_URL}/dishes/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch dish details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dish details:', error);
    throw error;
  }
};

export const createDish = async (dish) => {
  try {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    const response = await fetch(`${API_URL}/dishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dish),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create dish');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating dish:', error);
    throw error;
  }
};

export const updateDish = async (id, dish) => {
  try {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    const response = await fetch(`${API_URL}/dishes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dish),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update dish');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating dish:', error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    const response = await fetch(`${API_URL}/dishes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete dish');
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting dish:', error);
    throw error;
  }
};

export const fetchHealthyDishes = async () => {
  try {
    const response = await fetch(`${API_URL}/dishes/healthy`);
    if (!response.ok) {
      throw new Error('Failed to fetch healthy dishes');
    }
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
    console.error('Error fetching healthy dishes:', error);
    throw error;
  }
}

export const fetchSuggestionDishes = async (params = {}) => {
  try {
    const { prep_time, latitude, longitude, radius } = params;
    const queryParams = new URLSearchParams();

    if (prep_time) queryParams.append('prep_time', prep_time);
    if (latitude) queryParams.append('latitude', latitude);
    if (longitude) queryParams.append('longitude', longitude);
    if (radius) queryParams.append('radius', radius);

    const response = await fetch(`${API_URL}/dishes/suggestions?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suggested dishes');
    }

    const data = await response.json();
    
    // Transform data to match frontend format
    const dishes = data.map(item => ({
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
    console.error('Error fetching suggested dishes:', error);
    throw error;
  }
};