import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

/* ===========================
   PRODUCTS
=========================== */

// Create product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

/* ===========================
   PLATFORM LISTINGS
=========================== */

// Add listing for product
router.post('/listing', productController.addPlatformListing);

/* ===========================
   COMPARE PRODUCT
=========================== */

// Compare product prices by product name
router.get('/compare/search', productController.compareSearch);

// Compare all products by restaurant
router.get('/restaurant/:restaurantId/compare', productController.compareByRestaurant);

// Get single product
router.get('/:id', productController.getProductById);

export default router;
