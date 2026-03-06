import { Request, Response } from 'express';
import Favorite from '../models/favorite.model';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import PlatformListing from '../models/platformListing.model';

// Add to favorites
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId, platformId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    if (!productId || !platformId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and Platform ID are required',
      });
    }

    // Check if already favorited
    const existing = await Favorite.findOne({
      where: { userId, productId, platformId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already added to favorites',
      });
    }

    // Get listing price info
    const listing = await PlatformListing.findOne({
      where: { productId, platformId },
    });

    const favorite = await Favorite.create({
      userId,
      productId,
      platformId,
      savedPrice: listing?.price,
      savedDeliveryFee: listing?.deliveryFee,
    });

    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      favorite,
    });
  } catch (error: any) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to favorites',
      error: error.message,
    });
  }
};

// Get user's favorites
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'category', 'imageUrl', 'restaurantId'],
        },
        {
          model: Platform,
          attributes: ['id', 'name', 'logoUrl'],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error: any) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message,
    });
  }
};

// Remove from favorites
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { favoriteId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const favorite = await Favorite.findOne({
      where: { id: favoriteId, userId },
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    await favorite.destroy();

    res.status(200).json({
      success: true,
      message: 'Removed from favorites',
    });
  } catch (error: any) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing favorite',
      error: error.message,
    });
  }
};

// Check if product is favorited
export const isFavorited = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId, platformId } = req.query;

    if (!userId) {
      return res.status(200).json({
        success: true,
        isFavorited: false,
      });
    }

    const favorite = await Favorite.findOne({
      where: {
        userId,
        productId: productId,
        platformId: platformId,
      },
    });

    res.status(200).json({
      success: true,
      isFavorited: !!favorite,
      favorite,
    });
  } catch (error: any) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking favorite',
      error: error.message,
    });
  }
};
