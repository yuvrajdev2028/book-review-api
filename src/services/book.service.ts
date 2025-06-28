import prisma from '../config/database.config';
import { getCache, setCache } from '../config/redis.config';
import { Book } from '@prisma/client';

const BOOKS_CACHE_KEY = 'books';

export const getAllBooks = async (): Promise<Book[]> => {
  const cached = await getCache(BOOKS_CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  });

  await setCache(BOOKS_CACHE_KEY, JSON.stringify(books));
  return books;
};

export const createNewBook = async (title: string, author: string): Promise<Book> => {
  const newBook = await prisma.book.create({
    data: { title, author }
  });

  const updatedBooks = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  });

  await setCache(BOOKS_CACHE_KEY, JSON.stringify(updatedBooks));
  return newBook;
};
