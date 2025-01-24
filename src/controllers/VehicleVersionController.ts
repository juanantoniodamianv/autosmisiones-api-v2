// src/controllers/VehicleVersionController.ts
import { Request, Response } from "express";
import { VehicleVersion } from "../models/VehicleVersion";

class VehicleVersionController {
  // Obtener todas las versiones de vehículos
  public async getAllVehicleVersions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const versions = await VehicleVersion.findAll();
      res.json(versions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener una versión de vehículo por ID
  public async getVehicleVersionById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const version = await VehicleVersion.findByPk(req.params.id);
      if (version) {
        res.json(version);
      } else {
        res.status(404).json({ error: "VehicleVersion not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear una nueva versión de vehículo
  public async createVehicleVersion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const version = await VehicleVersion.create(req.body);
      res.status(201).json(version);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar una versión de vehículo por ID
  public async updateVehicleVersion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const version = await VehicleVersion.findByPk(req.params.id);
      if (version) {
        await version.update(req.body);
        res.json(version);
      } else {
        res.status(404).json({ error: "VehicleVersion not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar una versión de vehículo por ID
  public async deleteVehicleVersion(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const version = await VehicleVersion.findByPk(req.params.id);
      if (version) {
        await version.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "VehicleVersion not found" });
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

export const vehicleVersionController = new VehicleVersionController();
