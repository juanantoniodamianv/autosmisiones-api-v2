// src/controllers/PhoneController.ts
import { Request, Response } from "express";
import { Phone } from "../models/Phone";

class PhoneController {
  // Obtener todos los teléfonos
  public async getAllPhones(req: Request, res: Response): Promise<void> {
    try {
      const phones = await Phone.findAll();
      res.json(phones);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener un teléfono por ID
  public async getPhoneById(req: Request, res: Response): Promise<void> {
    try {
      const phone = await Phone.findByPk(req.params.id);
      if (phone) {
        res.json(phone);
      } else {
        res.status(404).json({ error: "Phone not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear un nuevo teléfono
  public async createPhone(req: Request, res: Response): Promise<void> {
    try {
      const phone = await Phone.create(req.body);
      res.status(201).json(phone);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar un teléfono por ID
  public async updatePhone(req: Request, res: Response): Promise<void> {
    try {
      const phone = await Phone.findByPk(req.params.id);
      if (phone) {
        await phone.update(req.body);
        res.json(phone);
      } else {
        res.status(404).json({ error: "Phone not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar un teléfono por ID
  public async deletePhone(req: Request, res: Response): Promise<void> {
    try {
      const phone = await Phone.findByPk(req.params.id);
      if (phone) {
        await phone.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Phone not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
}

export const phoneController = new PhoneController();
