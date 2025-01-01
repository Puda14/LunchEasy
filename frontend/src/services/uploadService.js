export async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://luncheasy.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      throw error;
    }
  }
