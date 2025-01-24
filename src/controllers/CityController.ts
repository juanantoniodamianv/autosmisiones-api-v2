import { Request, Response } from "express";
import { City } from "../models/City";

class CityController {
  public async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await City.findAll();
      res.json(cities);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async getCityById(req: Request, res: Response): Promise<void> {
    try {
      const city = await City.findByPk(req.params.id);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ error: "City not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async createCity(req: Request, res: Response): Promise<void> {
    try {
      const city = await City.create(req.body);
      res.status(201).json(city);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const city = await City.findByPk(req.params.id);
      if (city) {
        await city.update(req.body);
        res.json(city);
      } else {
        res.status(404).json({ error: "City not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const city = await City.findByPk(req.params.id);
      if (city) {
        await city.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "City not found" });
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

export const cityController = new CityController();
