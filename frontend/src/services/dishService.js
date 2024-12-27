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
    var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    const response = await fetch(`${API_URL}/dishes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
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
