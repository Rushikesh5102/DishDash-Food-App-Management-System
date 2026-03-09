import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import PlatformListing from '../models/platformListing.model';
import { Restaurant } from '../models/restaurant.model';

/* =========================
   CREATE PRODUCT
========================= */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, restaurantId, imageUrl } = req.body;

    const product = await Product.create({
      name,
      category,
      restaurantId,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

/* =========================
   ADD PLATFORM LISTING
========================= */
export const addPlatformListing = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      platformId,
      price,
      deliveryFee,
      discountType,
      discountValue,
      etaMinutes,
      redirectUrl,
    } = req.body;

    const listing = await PlatformListing.create({
      productId,
      platformId,
      price,
      deliveryFee,
      discountType,
      discountValue,
      etaMinutes,
      redirectUrl,
    });

    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding listing' });
  }
};

/* =========================
   SEARCH + COMPARE (Enhanced with Restaurant info)
========================= */
export const compareSearch = async (req: Request, res: Response) => {
  try {
    const { product } = req.query;

    if (!product) {
      return res.status(400).json({ message: 'Product query required' });
    }

    // ✅ Correct column name is "name"
    const foundProduct = await Product.findOne({
      where: {
        name: {
          [Op.like]: `%${product}%`,
        },
      },
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'cuisineType', 'location'],
        },
      ],
    });

    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const listings = await PlatformListing.findAll({
      where: { productId: foundProduct.id },
      include: [{ model: Platform }],
    });

    if (!listings.length) {
      return res.status(404).json({ message: 'No listings found' });
    }

    const comparisons = listings.map((listing: any) => {
      const basePrice = parseFloat(listing.price);
      const deliveryFee = parseFloat(listing.deliveryFee || 0);
      const discountValue = parseFloat(listing.discountValue || 0);

      let discount = 0;

      if (listing.discountType === 'percentage') {
        discount = (basePrice * discountValue) / 100;
      } else if (listing.discountType === 'flat') {
        discount = discountValue;
      }

      const finalPrice = basePrice + deliveryFee - discount;

      return {
        productName: foundProduct.name,
        productImage: foundProduct.imageUrl,
        restaurantName: (foundProduct as any).Restaurant?.name || 'Unknown',
        restaurantCuisine: (foundProduct as any).Restaurant?.cuisineType || 'Unknown',
        platform: listing.Platform.name,
        platformLogo: listing.Platform.logoUrl,
        basePrice,
        deliveryFee,
        discount,
        finalPrice,
        etaMinutes: listing.etaMinutes,
        redirectUrl: listing.redirectUrl,
        discountType: listing.discountType,
        rating: listing.rating || 0,
      };
    });

    const cheapest = comparisons.reduce((min: any, curr: any) =>
      curr.finalPrice < min.finalPrice ? curr : min
    );

    const fastestDelivery = comparisons.reduce((fastest: any, curr: any) =>
      curr.etaMinutes < fastest.etaMinutes ? curr : fastest
    );

    res.json({
      product: foundProduct.name,
      restaurant: {
        id: (foundProduct as any).restaurantId,
        name: (foundProduct as any).Restaurant?.name || 'Unknown',
        cuisine: (foundProduct as any).Restaurant?.cuisineType || 'Unknown',
        address: (foundProduct as any).Restaurant?.location || 'Unknown',
      },
      comparisons,
      cheapest,
      fastestDelivery,
    });
  } catch (error) {
    console.error('Comparison error:', error);
    console.error('Error details:', {
      message: (error as any)?.message,
      stack: (error as any)?.stack,
    });
    res.status(500).json({ 
      message: 'Error comparing prices',
      error: (error as any)?.message 
    });
  }
};

/* =========================
   COMPARE BY RESTAURANT
   Returns prices organized by restaurant
========================= */
export const compareByRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID required' });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Get all products from this restaurant
    const products = await Product.findAll({
      where: { restaurantId },
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this restaurant' });
    }

    const allComparisons = [];

    for (const prod of products) {
      const listings = await PlatformListing.findAll({
        where: { productId: prod.id },
        include: [{ model: Platform }],
      });

      if (listings.length > 0) {
        const comparisons = listings.map((listing: any) => {
          const basePrice = parseFloat(listing.price);
          const deliveryFee = parseFloat(listing.deliveryFee || 0);
          const discountValue = parseFloat(listing.discountValue || 0);

          let discount = 0;

          if (listing.discountType === 'percentage') {
            discount = (basePrice * discountValue) / 100;
          } else if (listing.discountType === 'flat') {
            discount = discountValue;
          }

          const finalPrice = basePrice + deliveryFee - discount;

          return {
            productId: prod.id,
            productName: prod.name,
            productImage: prod.imageUrl,
            platform: listing.Platform.name,
            platformLogo: listing.Platform.logoUrl,
            basePrice,
            deliveryFee,
            discount,
            finalPrice,
            etaMinutes: listing.etaMinutes,
            redirectUrl: listing.redirectUrl,
            rating: listing.rating || 0,
          };
        });

        allComparisons.push(...comparisons);
      }
    }

    // Sort by final price for easier comparison
    const sortedByPrice = [...allComparisons].sort((a, b) => a.finalPrice - b.finalPrice);

    res.json({
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        cuisine: (restaurant as any).cuisineType || 'Unknown',
        address: (restaurant as any).location || 'Unknown',
      },
      productCount: products.length,
      comparisonCount: allComparisons.length,
      comparisons: sortedByPrice,
    });
  } catch (error) {
    console.error('Restaurant comparison error:', error);
    res.status(500).json({
      message: 'Error comparing restaurant prices',
      error: (error as any)?.message,
    });
  }
};

/* =========================
   COMPARE PRODUCT BY NAME (SEARCH)
========================= */
export const compareProductByName = async (req: Request, res: Response) => {
  try {
    const { product } = req.query;

    if (!product || typeof product !== 'string') {
      return res.status(400).json({ message: 'Product name is required' });
    }

    // ✅ Correct column name is "name"
    const foundProduct = await Product.findOne({
      where: {
        name: {
          [Op.like]: `%${product}%`,
        },
      },
    });

    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const listings = await PlatformListing.findAll({
      where: { productId: foundProduct.id },
      include: [{ model: Platform }],
    });

    if (!listings.length) {
      return res.status(404).json({ message: 'No listings found' });
    }

    const comparisons = listings.map((listing: any) => {
      const basePrice = parseFloat(listing.price);
      const deliveryFee = parseFloat(listing.deliveryFee || 0);
      const discountValue = parseFloat(listing.discountValue || 0);

      let discount = 0;

      if (listing.discountType === 'percentage') {
        discount = (basePrice * discountValue) / 100;
      } else if (listing.discountType === 'flat') {
        discount = discountValue;
      }

      const finalPrice = basePrice + deliveryFee - discount;

      return {
        productName: foundProduct.name,
        productImage: foundProduct.imageUrl,
        platform: listing.Platform.name,
        basePrice,
        deliveryFee,
        discount,
        finalPrice,
        etaMinutes: listing.etaMinutes,
        redirectUrl: listing.redirectUrl,
      };
    });

    const cheapest = comparisons.reduce((min: any, curr: any) =>
      curr.finalPrice < min.finalPrice ? curr : min
    );

    res.json({
      product: foundProduct.name,
      comparisons,
      cheapest,
    });
  } catch (error) {
    console.error('Comparison error:', error);
    console.error('Error details:', {
      message: (error as any)?.message,
      stack: (error as any)?.stack,
    });
    res.status(500).json({ 
      message: 'Error comparing prices',
      error: (error as any)?.message 
    });
  }
};
