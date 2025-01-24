// src/controllers/PersonMediaResourceController.ts
import { Request, Response } from "express";
import { PersonMediaResource } from "../models/PersonMediaResource";

class PersonMediaResourceController {
  // Obtener todos los recursos multimedia de personas
  public async getAllPersonMediaResources(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResources = await PersonMediaResource.findAll();
      res.json(mediaResources);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener un recurso multimedia de persona por ID
  public async getPersonMediaResourceById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PersonMediaResource.findByPk(req.params.id);
      if (mediaResource) {
        res.json(mediaResource);
      } else {
        res.status(404).json({ error: "PersonMediaResource not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear un nuevo recurso multimedia de persona
  public async createPersonMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PersonMediaResource.create(req.body);
      res.status(201).json(mediaResource);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar un recurso multimedia de persona por ID
  public async updatePersonMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PersonMediaResource.findByPk(req.params.id);
      if (mediaResource) {
        await mediaResource.update(req.body);
        res.json(mediaResource);
      } else {
        res.status(404).json({ error: "PersonMediaResource not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar un recurso multimedia de persona por ID
  public async deletePersonMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PersonMediaResource.findByPk(req.params.id);
      if (mediaResource) {
        await mediaResource.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "PersonMediaResource not found" });
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

export const personMediaResourceController =
  new PersonMediaResourceController();
