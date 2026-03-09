import { Request, Response, NextFunction } from 'express';
import * as platformService from '../services/platform.service';

export const createPlatform = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const platform = await platformService.createPlatform(req.body);
    res.status(201).json(platform);
  } catch (error) {
    next(error);
  }
};

export const getPlatforms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const platforms = await platformService.getPlatforms();
    res.json(platforms);
  } catch (error) {
    next(error);
  }
};

export const getPlatformById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const platform = await platformService.getPlatformById(req.params.id);
    if (platform) {
      res.json(platform);
    } else {
      res.status(404).json({ message: 'Platform not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePlatform = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const platform = await platformService.updatePlatform(req.params.id, req.body);
    if (platform) {
      res.json(platform);
    } else {
      res.status(404).json({ message: 'Platform not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePlatform = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCount = await platformService.deletePlatform(req.params.id);
    if (deletedCount > 0) {
      res.json({ message: 'Platform removed' });
    } else {
      res.status(404).json({ message: 'Platform not found' });
    }
  } catch (error) {
    next(error);
  }
};
