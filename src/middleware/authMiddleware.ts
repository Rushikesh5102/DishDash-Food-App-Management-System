import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userEmail?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from headers or cookies
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided',
      });
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Attach user info to request
    req.userId = payload.id;
    req.userEmail = payload.email;
    next();
  } catch (error: any) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from headers or cookies
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.authToken;

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        req.userId = payload.id;
        req.userEmail = payload.email;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
