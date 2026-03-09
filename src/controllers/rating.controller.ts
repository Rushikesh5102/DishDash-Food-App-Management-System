import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Rating from '../models/rating.model';

export const createRating = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { orderId, productId, platformId, restaurantId, ratingType, rating, review } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating should be between 1 and 5' });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId,
        ratingType,
        productId: productId || null,
        platformId: platformId || null,
        restaurantId: restaurantId || null,
      },
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
      return res.status(200).json({ success: true, message: 'Rating updated successfully', rating: existingRating });
    }

    const newRating = await Rating.create({
      userId,
      orderId,
      productId,
      platformId,
      restaurantId,
      ratingType,
      rating,
      review,
      helpful: 0,
    });

    return res.status(201).json({ success: true, message: 'Rating created successfully', rating: newRating });
  } catch (error: any) {
    console.error('Create rating error:', error);
    return res.status(500).json({ success: false, message: 'Error creating rating', error: error.message });
  }
};

export const getRatings = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.query;

    if (!type || !id) {
      return res.status(400).json({ success: false, message: 'Type and ID are required' });
    }

    const filter: Record<string, unknown> = { ratingType: type };

    if (type === 'product') filter.productId = id;
    else if (type === 'platform') filter.platformId = id;
    else if (type === 'restaurant') filter.restaurantId = id;

    const ratings = await Rating.findAll({
      where: filter,
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    const averageRating =
      ratings.length > 0
        ? Number((ratings.reduce((sum, r: any) => sum + r.rating, 0) / ratings.length).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,
      count: ratings.length,
      averageRating,
      ratings,
    });
  } catch (error: any) {
    console.error('Get ratings error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching ratings', error: error.message });
  }
};

export const getUserRatings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const ratings = await Rating.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, count: ratings.length, ratings });
  } catch (error: any) {
    console.error('Get user ratings error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching user ratings', error: error.message });
  }
};

export const markHelpful = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findByPk(Number(ratingId));

    if (!rating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    rating.helpful = Number(rating.helpful || 0) + 1;
    await rating.save();

    return res.status(200).json({ success: true, message: 'Marked as helpful', rating });
  } catch (error: any) {
    console.error('Mark helpful error:', error);
    return res.status(500).json({ success: false, message: 'Error marking as helpful', error: error.message });
  }
};

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { ratingId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const result = await Rating.destroy({ where: { id: Number(ratingId), userId } });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    return res.status(200).json({ success: true, message: 'Rating deleted successfully' });
  } catch (error: any) {
    console.error('Delete rating error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting rating', error: error.message });
  }
};
