import prisma from '../config/database.config';
import { getCache, setCache } from '../config/redis.config';
import { Review } from '@prisma/client';

const getCacheKey = (bookId: number) => `reviews:book:${bookId}`;


export const getReviewsForBook = async (bookId: number): Promise<Review[]> => {
  const cacheKey = getCacheKey(bookId);

  const cached = await getCache(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const reviews = await prisma.review.findMany({
    where: { bookId },
    orderBy: { createdAt: 'desc' },
  });

  await setCache(cacheKey, JSON.stringify(reviews));
  return reviews;
};


export const createReviewForBook = async (
  bookId: number,
  content: string,
  rating: number
): Promise<Review> => {
  const review = await prisma.review.create({
    data: {
      content,
      rating,
      book: { connect: { id: bookId } },
    },
  });


  const updatedReviews = await prisma.review.findMany({
    where: { bookId },
    orderBy: { createdAt: 'desc' },
  });

  await setCache(getCacheKey(bookId), JSON.stringify(updatedReviews));
  return review;
};
