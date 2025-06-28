import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review API',
      version: '1.0.0',
      description: 'API documentation for the Book Review application',
    },
     servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            author: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            content: { type: 'string' },
            rating: { type: 'integer' },
            bookId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateBookInput: {
          type: 'object',
          required: ['title', 'author'],
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
          },
        },
        CreateReviewInput: {
          type: 'object',
          required: ['content', 'rating'],
          properties: {
            content: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;