import { describe, before, it } from "node:test";
import assert from "assert";
import { Person, Role } from "@prisma/client";

import { MockPersonService } from "../services/mock/mockPersonService";

describe("Person Service", () => {
  let service: MockPersonService;

  before(() => {
    service = new MockPersonService();
  });

  it("should return all people without filters", async () => {
    const people = await service.findAll();
    assert.strictEqual(people.length, 2);
    assert.strictEqual(people[0].name, "John Doe");
    assert.strictEqual(people[1].email, "jane.smith@example.com");
  });

  it("should filter people by role", async () => {
    const admins = await service.findAll({ role: "ADMIN" });
    assert.strictEqual(admins.length, 1);
    assert.strictEqual(admins[0].name, "Jane Smith");
  });

  it("should find person by existing ID", async () => {
    const person = await service.findById(1);
    assert.strictEqual(person?.email, "john.doe@example.com");
    assert.strictEqual(person?.role, "USER");
  });

  it("should return null for non-existent ID", async () => {
    const person = await service.findById(999);
    assert.strictEqual(person, null);
  });

  it("should create a new person", async () => {
    const newPerson = {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password789",
      role: "USER",
      maxPublications: 7,
      openingHours: "8:00 AM - 4:00 PM",
      locationStreet: "789 Oak St",
    } as unknown as Person;

    const createdPerson = await service.create(newPerson);
    assert.strictEqual(createdPerson.id, 3);
    assert.strictEqual(createdPerson.name, newPerson.name);
    assert.ok(createdPerson.createdAt instanceof Date);

    const allPeople = await service.findAll();
    assert.strictEqual(allPeople.length, 3);
  });

  it("should update existing person", async () => {
    const updatedData = { name: "John Updated", role: Role.ADMIN };
    const result = await service.update(1, updatedData);

    assert.strictEqual(result?.name, "John Updated");
    assert.strictEqual(result?.role, "ADMIN");
    assert.strictEqual(result?.email, "john.doe@example.com"); // Existing field remains

    const person = await service.findById(1);
    assert.strictEqual(person?.name, "John Updated");
  });

  it("should return null when updating non-existent person", async () => {
    const result = await service.update(999, { name: "Ghost" });
    assert.strictEqual(result, null);
  });

  it("should delete existing person", async () => {
    await service.delete(1);
    const person = await service.findById(1);
    assert.strictEqual(person, null);
  });

  it("should throw error when deleting non-existent person", async () => {
    await assert.rejects(
      async () => {
        await service.delete(999);
      },
      {
        name: "Error",
        message: "Person not found.",
      }
    );
  });

  it("should find one person by query", async () => {
    const person = await service.findOne({ email: "jane.smith@example.com" });
    assert.strictEqual(person?.id, 2);
    assert.strictEqual(person?.role, "ADMIN");
  });

  it("should return null when no match for findOne", async () => {
    const person = await service.findOne({ email: "nonexistent@example.com" });
    assert.strictEqual(person, null);
  });
});
