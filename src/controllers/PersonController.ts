import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export interface IPersonService {
  findAll(query?: any): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any | null>;
  delete(id: number): Promise<void>;
  findOne(query: any): Promise<any | null>;
}

export class PersonController {
  private personService: IPersonService;

  constructor(personService: IPersonService) {
    this.personService = personService;
  }

  // TODO:
  // paginate
  // filter
  // sort
  getAllPeople = async (req: Request, res: Response): Promise<void> => {
    try {
      const people = await this.personService.findAll();
      res.json(people);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getPersonById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(401).json({ error: "User ID not found" });
        return;
      }

      const person = await this.personService.findOne({ clerkId: id });
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
  };

  updatePerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const personId = parseInt(req.params.id);
      const person = await this.personService.findById(personId);
      if (person) {
        await this.personService.update(personId, req.body);
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
  };

  deletePerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const personId = parseInt(req.params.id);
      const person = await this.personService.findById(personId);
      if (person) {
        await this.personService.delete(personId);
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
  };

  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const person = await this.personService.findOne({
        email: req.body.email,
      });

      if (person) {
        res.status(400).json({ error: "Person already exists" });
        return;
      }
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPerson = await this.personService.create({
        email: req.body.email,
        password: hashedPassword,
        role: "USER",
      });

      res.status(201).json(newPerson);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message, stack: error.stack });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const person = await this.personService.findOne({
        email: req.body.email,
      });
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
  };
}
