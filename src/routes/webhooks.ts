// routes/webhooks.ts
import express from 'express';
import { Webhook } from 'svix';

import { PersonService } from '../services/personService';

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
  } catch (err) {
    res.status(400).json({ error: 'Webhook verification failed' });
    return;
  }
};

// Webhook handler
router.post('/clerk', express.raw({ type: 'application/json' }), verifyWebhook, async (req, res) => {
  console.log('Webhook received');
  console.log(req.body);
  
  const { type, data } = req.body;

  try {
    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      case 'user.updated':
        await handleUserUpdated(data);
        break;
    //   case 'user.deleted':
    //     await handleUserDeleted(data);
    //     break;
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
    
    console.log('User created in database:', user.id);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Handle user updates
const handleUserUpdated = async (userData: any) => {
  try {
    const personService = new PersonService();
    const user = await personService.update(userData.id,{
        email: userData.email_addresses[0]?.email_address || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        updatedAt: new Date(userData.updated_at),
      });
    
    console.log('User updated in database:', user.id);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Handle user deletion
// const handleUserDeleted = async (userData: any) => {
//   try {
//     await prisma.user.delete({
//       where: { clerkId: userData.id },
//     });
    
//     console.log('User deleted from database:', userData.id);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//   }
// };

export default router;