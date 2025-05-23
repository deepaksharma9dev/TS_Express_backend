import { Request, Response, NextFunction,RequestHandler } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Define the shape of the JWT payload
export interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// JWT authentication middleware
export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Cast req as AuthRequest and assign decoded user
    (req as AuthRequest).user = decoded;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
