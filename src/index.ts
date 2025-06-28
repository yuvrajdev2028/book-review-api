import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import bookRoutes from './routes/book.routes';
import reviewRoutes from './routes/review.routes';


const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/books', bookRoutes);
app.use('/books', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API! Visit /api-docs for documentation.');
});

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}