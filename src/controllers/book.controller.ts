import { Request, Response } from 'express';
import { getAllBooks, createNewBook } from '../services/book.service';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await createNewBook(title, author);
    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
