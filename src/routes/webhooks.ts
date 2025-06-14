// routes/webhooks.ts
import express from 'express';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/clerk-sdk-node'

import { PersonService } from '../services/personService';
import { Prisma } from '@prisma/client';

const router = express.Router();

// Middleware to verify webhook signature
const verifyWebhook = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    res.status(500).json({ error: 'Please add CLERK_WEBHOOK_SECRET to your environment variables' });
    return;
  }

  const headers = req.headers;
  const payload = JSON.stringify(req.body);

  const wh = new Webhook(WEBHOOK_SECRET);
  
  try {
    wh.verify(payload, {
      'svix-id': headers['svix-id'] as string,
      'svix-timestamp': headers['svix-timestamp'] as string,
      'svix-signature': headers['svix-signature'] as string,
    });
    next();
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).json({ error: 'Webhook verification failed' });
    return;
  }
};

// Webhook handler
router.post('/clerk', express.raw({ type: 'application/json' }), verifyWebhook, async (req, res) => {
  // console.log(req.body);
  
  const { type, data } = req.body;
  console.log(`[${type}] Webhook received`);

  try {
    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      case 'user.updated':
        await handleUserUpdated(data);
        break;
      case 'user.deleted':
        await handleUserDeleted(data);
        break;
      default:
        console.log(`Unhandled webhook type: ${type}`);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Handle user creation
const handleUserCreated = async (userData: any) => {
  try {
    const personService = new PersonService();
    const user = await personService.create({
        clerkId: userData.id,
        email: userData.email_addresses[0]?.email_address || '',
        name: [userData.first_name, userData.last_name].join(' ') || '',
        // TODO: add imageUrl
        // imageUrl: userData.image_url || '', 
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      });
    
      await clerkClient.users.updateUserMetadata(userData.id, {
        publicMetadata: {
          role: 'user',
          maxPublications: 3,
        },
      })
    
    console.log('User created in database:', user.id);
  } catch (error) {
    // If error Unique constraint failed on the fields then log the error
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      console.error('Error creating user:', error);
    } else {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

// Handle user updates
const handleUserUpdated = async (userData: any) => {
  try {
    const personService = new PersonService();
    const user = await personService.findOne({ clerkId: userData.id });

    if (!user) {
      console.log('User not found in database:', userData.id, 'creating...');
      await handleUserCreated(userData);
      return;
    }

    await personService.update(user.id, {
        email: userData.email_addresses[0]?.email_address || '',
        name: [userData.first_name, userData.last_name].join(' ') || '',
        updatedAt: new Date(userData.updated_at),
      });
    
    console.log('User updated in database:', user.id);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Handle user deletion
const handleUserDeleted = async (userData: any) => {
  try {
    console.log('User deleted from clerk:', userData);
    const personService = new PersonService();
    const user = await personService.findOne({ clerkId: userData.id });
    
    if (user) {
      await personService.delete(user.id)
    } else {
      console.log('User not found in database:', userData.id);
    }

    console.log('User deleted from database:', userData.id);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default router;