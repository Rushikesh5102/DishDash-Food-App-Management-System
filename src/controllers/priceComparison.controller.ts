import { Request, Response, NextFunction } from 'express';
import * as priceComparisonService from '../services/priceComparison.service';
import { IPriceComparison } from '../models/priceComparison.model';

export const createPriceComparison = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priceComparison = await priceComparisonService.createPriceComparison(req.body);
    res.status(201).json(priceComparison);
  } catch (error) {
    next(error);
  }
};

export const getPriceComparisons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priceComparisons = await priceComparisonService.getPriceComparisons();
    res.json(priceComparisons);
  } catch (error) {
    next(error);
  }
};

export const getPriceComparisonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priceComparison = await priceComparisonService.getPriceComparisonById(req.params.id);
    if (priceComparison) {
      res.json(priceComparison);
    } else {
      res.status(404).json({ message: 'PriceComparison not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePriceComparison = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priceComparison = await priceComparisonService.updatePriceComparison(req.params.id, req.body);
    if (priceComparison) {
      res.json(priceComparison);
    } else {
      res.status(404).json({ message: 'PriceComparison not found' });
    }
  } catch (error) {
    next(error);
  }
};

import { IntegrationService } from '../services/integration.service';

const integrationService = new IntegrationService();

export const deletePriceComparison = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priceComparison = await priceComparisonService.deletePriceComparison(req.params.id);
    if (priceComparison) {
      res.json({ message: 'PriceComparison removed' });
    } else {
      res.status(404).json({ message: 'PriceComparison not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const compareProductPrices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productName } = req.body;
    if (!productName) {
      return res.status(400).json({ message: 'productName is required' });
    }
    const comparisonResults = await integrationService.comparePrices(productName);
    res.status(200).json(comparisonResults);
  } catch (error) {
    next(error);
  }
};
