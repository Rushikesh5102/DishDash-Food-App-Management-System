import { Request, Response } from 'express';
import Rating from '../models/rating.model';

// Create rating
export const createRating = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      orderId,
      productId,
      platformId,
      restaurantId,
      ratingType,
      rating,
      review,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating should be between 1 and 5',
      });
    }

    // Check if rating already exists (for duplicate prevention)
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
      // Update existing rating
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: 'Rating updated successfully',
        rating: existingRating,
      });
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

    res.status(201).json({
      success: true,
      message: 'Rating created successfully',
      rating: newRating,
    });
  } catch (error: any) {
    console.error('Create rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating rating',
      error: error.message,
    });
  }
};

// Get ratings for an entity
export const getRatings = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.query; // type: 'product', 'platform', etc., id: entity ID

    if (!type || !id) {
      return res.status(400).json({
        success: false,
        message: 'Type and ID are required',
      });
    }

    let where: any = { ratingType: type };

    if (type === 'product') where.productId = id;
    else if (type === 'platform') where.platformId = id;
    else if (type === 'restaurant') where.restaurantId = id;

    const ratings = await Rating.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    const averageRating = ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
      : null;

    res.status(200).json({
      success: true,
      count: ratings.length,
      averageRating: parseFloat(averageRating || '0') || 0,
      ratings,
    });
  } catch (error: any) {
    console.error('Get ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ratings',
      error: error.message,
    });
  }
};

// Get user's ratings
export const getUserRatings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const ratings = await Rating.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error: any) {
    console.error('Get user ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user ratings',
      error: error.message,
    });
  }
};

// Mark rating as helpful
export const markHelpful = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    rating.helpful += 1;
    await rating.save();

    res.status(200).json({
      success: true,
      message: 'Marked as helpful',
      rating,
    });
  } catch (error: any) {
    console.error('Mark helpful error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking as helpful',
      error: error.message,
    });
  }
};

// Delete rating
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { ratingId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const rating = await Rating.findOne({
      where: { id: ratingId, userId },
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    await rating.destroy();

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting rating',
      error: error.message,
    });
  }
};
