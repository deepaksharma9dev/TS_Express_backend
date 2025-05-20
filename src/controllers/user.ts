import { Request, Response } from 'express';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [newUser] = await db.insert(users)
      .values({ name, email, password: hashedPassword })
      .returning();
    
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    res.status(201).json({ 
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token 
    });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
    return;
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, userId));
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({ 
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
    return
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { name } = req.body;
    
    await db.update(users)
      .set({ name })
      .where(eq(users.id, userId));
    
    res.sendStatus(200);
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> =>{
  try {
    const userId = parseInt(req.params.id);
    
    await db.delete(users)
      .where(eq(users.id, userId));
    
    res.sendStatus(200);
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email));
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid credentials' });
      return 
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    res.json({ 
      user: { id: user.id, name: user.name, email: user.email },
      token 
    });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
    return;
  }
};