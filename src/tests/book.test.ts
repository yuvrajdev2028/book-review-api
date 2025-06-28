import request from 'supertest';
import app from '..'; 

describe('Book API', () => {
  let createdBookId: number;

  it('should return 200 and an empty array initially', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for invalid book payload', async () => {
    const res = await request(app).post('/books').send({
      title: '',
      author: '',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should create a book successfully', async () => {
    const res = await request(app).post('/books').send({
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Clean Architecture');
    expect(res.body.author).toBe('Robert C. Martin');

    createdBookId = res.body.id;
  });

  it('should return the newly created book in GET /books', async () => {
    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((book: any) => book.id === createdBookId)).toBeDefined();
  });
});
