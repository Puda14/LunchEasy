const API_URL = 'http://localhost:5000';

export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${API_URL}/restaurants`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    // var token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Unauthorized')
    // }
    const response = await fetch(`${API_URL}/restaurants/${id}`, {
      headers: {
        // 'Authorization': `Bearer ${token}`, // Adjust if needed
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    throw error;
  }
};