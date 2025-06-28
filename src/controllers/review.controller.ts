import { Request, Response } from 'express';
import { getReviewsForBook, createReviewForBook } from '../services/review.service';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      res.status(400).json({ message: 'Invalid bookId' });
    }

    const reviews = await getReviewsForBook(bookId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const { content, rating } = req.body;

    if (isNaN(bookId)) {
        res.status(400).json({ message: 'Invalid bookId' });
    }

    if (!content || typeof rating !== 'number' || rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Content and rating (1–5) are required' });
    }

    const newReview = await createReviewForBook(bookId, content, rating);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
