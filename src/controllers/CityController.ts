import { Request, Response } from "express";
import { CityRepository } from "../repositories/City";

class CityController {
  city = new CityRepository();

  public async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await this.city.findAll();
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
      const cityId = parseInt(req.params.id);
      const city = await this.city.findById(cityId);
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
      const city = await this.city.create(req.body);
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
      const cityId = parseInt(req.params.id);
      let city = await this.city.findById(cityId);
      if (city) {
        let city = await this.city.update(cityId, req.body);
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
      const cityId = parseInt(req.params.id);
      let city = await this.city.findById(cityId);
      if (city) {
        await this.city.delete(cityId);
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
