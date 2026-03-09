import { Request, Response, NextFunction } from 'express';
import * as restaurantService from '../services/restaurant.service';

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const getRestaurants = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurants = await restaurantService.getRestaurants();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await restaurantService.deleteRestaurant(req.params.id);
    if (deleted > 0) {
      res.json({ message: 'Restaurant deleted' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const addMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.addMenuItem(req.params.id, req.body);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.updateMenuItem(req.params.id, req.params.itemId, req.body);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant or menu item not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantService.deleteMenuItem(req.params.id, req.params.itemId);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant or menu item not found' });
    }
  } catch (error) {
    next(error);
  }
};
