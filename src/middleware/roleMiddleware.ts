import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

type Role = 'admin' | 'user' | 'business';

export const requireRole = (allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = req.headers.authorization?.split(' ')[1];
      
      if (!sessionId) {
        return res.status(401).json({ error: 'No session token provided' });
      }

      const session = await clerkClient.sessions.getSession(sessionId);
      const user = await clerkClient.users.getUser(session.userId);
      
      // Get the role from the user's public metadata
      const userRole = user.publicMetadata.role as Role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      // Add the role to the request object for use in route handlers
      req.user = { ...req.user, role: userRole };
      
      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}; 