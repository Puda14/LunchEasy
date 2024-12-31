const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My Express API', // Tên API
    version: '1.0.0',       // Phiên bản API
    description: 'API documentation with Swagger',
  },
  servers: [
    {
      url: 'https://luncheasy.onrender.com', // URL server
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // Định nghĩa Schema cho Dish
      Dish: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'The name of the dish' },
          ingredients: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of ingredients for the dish',
          },
          calories: { type: 'number', format: 'float', description: 'Calories in the dish' },
          protein: { type: 'number', format: 'float', description: 'Protein content' },
          diet_type: {
            type: 'string',
            enum: ['vegan', 'keto', 'vegetarian', 'other'],
            description: 'Diet type for the dish',
          },
          prep_time: { type: 'integer', description: 'Preparation time in minutes' },
          rating: { type: 'number', format: 'float', description: 'Rating of the dish' },
          price: { type: 'number', format: 'float', description: 'Price of the dish' },
          restaurant_id: { type: 'string', description: 'ID of the restaurant serving this dish' },
          images: { type: 'array', items: { type: 'string', format: 'uri' }, description: 'Image URLs' },
          description: { type: 'string', description: 'Description of the dish'}
        },
      },
      // Định nghĩa Schema cho Restaurant
      Restaurant: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Name of the restaurant' },
          address: { type: 'string', description: 'Restaurant address' },
          latitude: { type: 'number', format: 'float', description: 'Latitude of the restaurant' },
          longitude: { type: 'number', format: 'float', description: 'Longitude of the restaurant' },
          rating: { type: 'number', format: 'float', description: 'Restaurant rating' },
          images: { type: 'array', items: { type: 'string', format: 'uri' }, description: 'Images of the restaurant' },
          menu: { type: 'array', items: { $ref: '#/components/schemas/Dish' }, description: 'Restaurant menu' },
        },
      },
      // Định nghĩa Schema cho User
      User: {
        type: 'object',
        properties: {
          username: { type: 'string', description: 'The username of the user' },
          email: { type: 'string', description: 'Email of the user' },
          password: { type: 'string', description: 'Password of the user' },
          role: { type: 'string', enum: ['User', 'Admin'], description: 'User role' },
          phone: { type: 'string', description: 'User phone number' },
          avatar: { type: 'string', format: 'uri', description: 'User avatar URL' },
          address: { type: 'string', description: 'User address' },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Đường dẫn tới file có chú thích
};

const swaggerSpec = swaggerJSDoc(options);
console.log(JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
