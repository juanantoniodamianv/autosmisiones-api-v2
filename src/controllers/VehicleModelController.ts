// src/controllers/VehicleModelController.ts
import { Request, Response } from "express";
import { VehicleModel } from "../models/VehicleModel";

class VehicleModelController {
  // Obtener todos los modelos de vehículos
  public async getAllVehicleModels(req: Request, res: Response): Promise<void> {
    try {
      const models = await VehicleModel.findAll();
      res.json(models);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener un modelo de vehículo por ID
  public async getVehicleModelById(req: Request, res: Response): Promise<void> {
    try {
      const model = await VehicleModel.findByPk(req.params.id);
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({ error: "VehicleModel not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear un nuevo modelo de vehículo
  public async createVehicleModel(req: Request, res: Response): Promise<void> {
    try {
      const model = await VehicleModel.create(req.body);
      res.status(201).json(model);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar un modelo de vehículo por ID
  public async updateVehicleModel(req: Request, res: Response): Promise<void> {
    try {
      const model = await VehicleModel.findByPk(req.params.id);
      if (model) {
        await model.update(req.body);
        res.json(model);
      } else {
        res.status(404).json({ error: "VehicleModel not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar un modelo de vehículo por ID
  public async deleteVehicleModel(req: Request, res: Response): Promise<void> {
    try {
      const model = await VehicleModel.findByPk(req.params.id);
      if (model) {
        await model.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "VehicleModel not found" });
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

export const vehicleModelController = new VehicleModelController();
