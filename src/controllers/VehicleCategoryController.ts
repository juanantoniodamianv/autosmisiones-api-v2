// src/controllers/VehicleCategoryController.ts
import { Request, Response } from "express";
import { VehicleCategory } from "../models/VehicleCategory";

class VehicleCategoryController {
  // Obtener todas las categorías de vehículos
  public async getAllVehicleCategories(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const categories = await VehicleCategory.findAll();
      res.json(categories);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener una categoría de vehículo por ID
  public async getVehicleCategoryById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const category = await VehicleCategory.findByPk(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "VehicleCategory not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear una nueva categoría de vehículo
  public async createVehicleCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const category = await VehicleCategory.create(req.body);
      res.status(201).json(category);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar una categoría de vehículo por ID
  public async updateVehicleCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const category = await VehicleCategory.findByPk(req.params.id);
      if (category) {
        await category.update(req.body);
        res.json(category);
      } else {
        res.status(404).json({ error: "VehicleCategory not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar una categoría de vehículo por ID
  public async deleteVehicleCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const category = await VehicleCategory.findByPk(req.params.id);
      if (category) {
        await category.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "VehicleCategory not found" });
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

export const vehicleCategoryController = new VehicleCategoryController();
