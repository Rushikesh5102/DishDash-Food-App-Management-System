import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

router.route('/')
  .post(productController.createProduct)
  .get(productController.getProducts);

router.post('/search', productController.searchProduct);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
