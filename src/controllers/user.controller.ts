import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.loginUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Use (req as any) to bypass the missing 'user' property check
        const user = await userService.getUserProfile((req as any).user!.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUserProfile((req as any).user!.id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};