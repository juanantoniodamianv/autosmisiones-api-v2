// src/controllers/PersonController.ts
import { Request, Response } from "express";
import { Person } from "../models/Person";

class PersonController {
  // Obtener todas las personas
  public async getAllPeople(req: Request, res: Response): Promise<void> {
    try {
      const people = await Person.findAll();
      res.json(people);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener una persona por ID
  public async getPersonById(req: Request, res: Response): Promise<void> {
    try {
      const person = await Person.findByPk(req.params.id);
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear una nueva persona
  public async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const person = await Person.create(req.body);
      res.status(201).json(person);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar una persona por ID
  public async updatePerson(req: Request, res: Response): Promise<void> {
    try {
      const person = await Person.findByPk(req.params.id);
      if (person) {
        await person.update(req.body);
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar una persona por ID
  public async deletePerson(req: Request, res: Response): Promise<void> {
    try {
      const person = await Person.findByPk(req.params.id);
      if (person) {
        await person.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Person not found" });
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

export const personController = new PersonController();
