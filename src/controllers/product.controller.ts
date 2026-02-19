import { Request, Response, NextFunction } from 'express';
import { fetchPrices } from '../services/scraper.service';
import Price from '../models/Price';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      return res.json(updatedProduct);
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ message: 'Product name is required.' });
  }

  try {
    // Find or create the product
    const [product] = await Product.findOrCreate({
      where: { name: productName },
      defaults: { name: productName }, // Add other defaults like description, imageUrl if applicable
    });

    // Fetch prices from the scraper service
    const fetchedPrices = await fetchPrices(productName);

    // Save fetched prices to the database
    const createdPrices = await Promise.all(
      fetchedPrices.map((item: { platform: string; price: number }) =>
        Price.create({
          productId: product.id,
          platform: item.platform,
          price: item.price,
          timestamp: new Date(),
        })
      )
    );

    res.status(201).json(createdPrices);
  } catch (error: any) {
    console.error('Error in searchProduct:', error);
    if (error.message.includes('Scraper Unavailable')) {
      return res.status(503).json({ message: error.message });
    }
    next(error);
  }
};
