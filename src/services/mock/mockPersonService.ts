import { Person } from "@prisma/client";

import { IPersonService } from "../../controllers/PersonController";

export class MockPersonService implements IPersonService {
  private people: Person[];

  constructor() {
    this.people = [
      {
        name: "John Doe",
        id: 1,
        email: "john.doe@example.com",
        password: "password123",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPublications: 5,
        openingHours: "9:00 AM - 5:00 PM",
        locationStreet: "123 Main St",
      },
      {
        name: "Jane Smith",
        id: 2,
        email: "jane.smith@example.com",
        password: "password456",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPublications: 10,
        openingHours: "10:00 AM - 6:00 PM",
        locationStreet: "456 Elm St",
      },
    ];
  }

  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
  }

  async findAll(where?: Partial<Person>): Promise<Person[]> {
    const filteredPeople = this.people.filter((person) => {
      return Object.entries(where || {}).every(
        ([key, value]) => person[key as keyof Person] === value
      );
    });
    return this.simulateDelay(filteredPeople);
  }

  async findById(id: number): Promise<Person | null> {
    const person = this.people.find((p) => p.id === id);
    return this.simulateDelay(person || null);
  }

  async create(data: Person): Promise<Person> {
    const person = {
      ...data,
      id: this.people.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.people.push(person);
    return this.simulateDelay(person);
  }

  async update(id: number, data: Partial<Person>): Promise<Person | null> {
    const personIndex = this.people.findIndex((p) => p.id === id);
    if (personIndex === -1) {
      return this.simulateDelay(null);
    }

    const updatedPerson = { ...this.people[personIndex], ...data };
    this.people[personIndex] = updatedPerson;
    return this.simulateDelay(updatedPerson);
  }

  async delete(id: number): Promise<void> {
    const personIndex = this.people.findIndex((p) => p.id === id);
    if (personIndex === -1) {
      throw new Error("Person not found.");
    }
    this.people.splice(personIndex, 1);
    return Promise.resolve();
  }

  async findOne(query: Partial<Person>): Promise<Person | null> {
    const person = this.people.find((p) =>
      Object.entries(query).every(
        ([key, value]) => p[key as keyof Person] === value
      )
    );
    return this.simulateDelay(person || null);
  }
}
