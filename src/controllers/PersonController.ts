// src/controllers/PersonController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PersonRepository } from "../repositories/Person";

// TODO:
// Do I need create as a singleton this one?
class PersonController {
  person = new PersonRepository();

  // TODO:
  // paginate
  public async getAllPeople(req: Request, res: Response): Promise<void> {
    try {
      const people = await this.person.findAll();
      res.json(people);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async getPersonById(req: Request, res: Response): Promise<void> {
    try {
      const person = await this.person.findById(parseInt(req.params.id));
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

  public async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const person = await this.person.create(req.body);
      res.status(201).json(person);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async updatePerson(req: Request, res: Response): Promise<void> {
    try {
      const personId = parseInt(req.params.id);
      const person = await this.person.findById(personId);
      if (person) {
        await this.person.update(personId, req.body);
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

  public async deletePerson(req: Request, res: Response): Promise<void> {
    try {
      const personId = parseInt(req.params.id);
      const person = await this.person.findById(personId);
      if (person) {
        await this.person.delete(personId);
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

  public async signUp(req: Request, res: Response): Promise<void> {
    try {
      // Person exists?
      const person = await this.person.findAll({ email: req.body.email });
      if (person) {
        res.status(400).json({ error: "Person already exists" });
        return;
      }
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPerson = await this.person.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json(newPerson);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async signIn(req: Request, res: Response): Promise<void> {
    try {
      const person = await this.person.findOne({ email: req.body.email });
      // password may be null, in the scenario that we create a new one without active, Ex: invitations to register
      if (!person || !person.password) {
        res.status(404).json({ error: "Person not found" });
        return;
      }

      const password = req.body.password;
      const isPasswordValid = await bcrypt.compare(password, person.password);
      if (isPasswordValid) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ userId: person.id }, jwtSecret);
        res.json({ token, person });
      } else {
        res.status(401).json({ error: "Invalid password" });
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
