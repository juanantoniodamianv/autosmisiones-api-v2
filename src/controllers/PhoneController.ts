import { Request, Response } from "express";
import { IPhoneService } from "../services/mock/mockPhoneService";

interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

export class PhoneController {
  constructor(private phoneService: IPhoneService) {}

  getAllPhones = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const phones = await this.phoneService.getAllPhones(userId);
      res.json(phones);
    } catch (error) {
      res.status(500).json({ error: "Error fetching phones" });
    }
  };

  createPhone = async (req: AuthenticatedRequest, res: Response) => {
    try {
      console.log("createPhone");
      const userId = req.userId;
      if (!userId) {
        console.log("User not authenticated");
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { phone, type } = req.body;

      if (!phone) {
        console.log("Phone number is required");
        return res.status(400).json({ error: "Phone number is required" });
      }

      const newPhone = await this.phoneService.createPhone(userId, { phone, type });
      res.status(201).json(newPhone);
    } catch (error) {
      console.log("Error creating phone", error);
      res.status(500).json({ error: "Error creating phone" });
    }
  };

  updatePhone = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const phoneId = parseInt(req.params.id);
      const { phone, type, verified } = req.body;

      const updatedPhone = await this.phoneService.updatePhone(userId, phoneId, {
        phone,
        type,
        verified,
      });

      res.json(updatedPhone);
    } catch (error) {
      if (error instanceof Error && error.message === "Phone not found") {
        return res.status(404).json({ error: "Phone not found" });
      }
      res.status(500).json({ error: "Error updating phone" });
    }
  };

  deletePhone = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const phoneId = parseInt(req.params.id);
      await this.phoneService.deletePhone(userId, phoneId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Phone not found") {
        return res.status(404).json({ error: "Phone not found" });
      }
      res.status(500).json({ error: "Error deleting phone" });
    }
  };
} 