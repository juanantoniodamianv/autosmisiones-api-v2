import { Person } from '@prisma/client';
import { Clerk } from '@clerk/clerk-sdk-node';

declare global {
  namespace Express {
    interface Request {
      person?: Person;
      auth?: {
        userId: string;
        sessionId: string;
      };
      clerk?: Clerk;
    }
  }
} 