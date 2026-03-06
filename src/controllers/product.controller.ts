import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import PlatformListing from '../models/platformListing.model';

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
   SEARCH + COMPARE
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

    const cheapest = comparisons.reduce((min, curr) =>
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