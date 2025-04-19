import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Raw request body:', req.body);
    
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid UID or password' }); // Changed message
      return;
    }

    if (password !== user.password) {
      res.status(401).json({ error: 'Invalid UID or password' }); // Changed message
      return;
    }

    res.json({ 
      success: true,
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
};