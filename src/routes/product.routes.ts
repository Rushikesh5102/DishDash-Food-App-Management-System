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

// Get single product
router.get('/:id', productController.getProductById);

/* ===========================
   PLATFORM LISTINGS
=========================== */

// Add listing for product
router.post('/listing', productController.addPlatformListing);

/* ===========================
   COMPARE PRODUCT
=========================== */

// Compare product prices
router.get('/compare/search', productController.compareSearch);

export default router;