import { Router } from 'express';
import * as priceComparisonController from '../controllers/priceComparison.controller';

const router = Router();

router.route('/')
  .post(priceComparisonController.createPriceComparison)
  .get(priceComparisonController.getPriceComparisons);

router.route('/:id')
  .get(priceComparisonController.getPriceComparisonById)
  .put(priceComparisonController.updatePriceComparison)
  .delete(priceComparisonController.deletePriceComparison);

router.route('/compare')
  .post(priceComparisonController.compareProductPrices);


export default router;
