import request from 'supertest';
import app from '..'; 

describe('Review API', () => {
  let bookId: number;

  beforeAll(async () => {
    const res = await request(app).post('/books').send({
      title: 'The Mythical Man-Month',
      author: 'Fred Brooks',
    });
    bookId = res.body.id;
  });

  it('should return empty array for reviews of a new book', async () => {
    const res = await request(app).get(`/books/${bookId}/reviews`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should return 400 for invalid book ID format', async () => {
    const res = await request(app).get(`/books/invalid/reviews`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 400 when posting invalid review', async () => {
    const res = await request(app).post(`/books/${bookId}/reviews`).send({
      content: '',
      rating: 10, 
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should successfully post a valid review', async () => {
    const res = await request(app).post(`/books/${bookId}/reviews`).send({
      content: 'Essential reading for software engineering managers.',
      rating: 5,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toContain('Essential reading');
  });

  it('should return list of reviews for the book', async () => {
    const res = await request(app).get(`/books/${bookId}/reviews`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('content');
    expect(res.body[0]).toHaveProperty('rating');
  });
});
