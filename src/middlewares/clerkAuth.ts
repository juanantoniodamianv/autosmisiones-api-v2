import { Request, Response, NextFunction } from 'express';
import clerkClient, { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const clerkMiddleware = ClerkExpressRequireAuth();

export const clerkAuth = (req: Request, res: Response, next: NextFunction) => {
  // Debug logs
  console.log('🔍 Clerk Auth Debug:');
  console.log('- Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
  console.log('- Cookies present:', !!req.cookies);
  console.log('- __session cookie:', req.cookies?.['__session'] ? 'Present' : 'Missing');
  
  // Extract token from __session cookie if not in Authorization header
  if (!req.headers.authorization && req.cookies && req.cookies['__session']) {
    console.log('✅ Setting Authorization header from __session cookie');
    req.headers.authorization = `Bearer ${req.cookies['__session']}`;
  }
  
  return clerkMiddleware(req, res, next);
};

export const syncClerkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.auth as { userId: string };

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user exists in our database
    let person = await prisma.person.findUnique({
      where: { clerkId: userId },
    });

    if (!person) {
      // Create new person if doesn't exist
      const clerkUser = await clerkClient.users.getUser(userId);
      
      person = await prisma.person.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
        },
      });
    }

    // Attach the person to the request for use in routes
    req.person = person;
    next();
  } catch (error) {
    console.error('Error in syncClerkUser middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 