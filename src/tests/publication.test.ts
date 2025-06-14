import { describe, before, it } from "node:test";
import assert from "assert";
import { Publication } from "@prisma/client";

import { MockPublicationService } from "../services/mock/mockPublicationService";

describe("Publication Service", () => {
  let service: MockPublicationService;

  before(() => {
    service = new MockPublicationService();
  });

  it("should return all publication without filters", async () => {
    const publication = await service.findAll();
    assert.strictEqual(publication.length, 2);
    assert.strictEqual(publication[0].vehicleMakeId, 1);
    assert.strictEqual(publication[1].year, 2022);
  });

  it("should find publication by existing ID", async () => {
    const publication = await service.findById(1);
    assert.strictEqual(publication?.cityId, 1);
    assert.strictEqual(publication?.title, "Toyota Corolla 2020");
  });

  it("should return null for non-existent ID", async () => {
    const publication = await service.findById(999);
    assert.strictEqual(publication, null);
  });

  it("should create a new publication", async () => {
    const newPublication = {
      id: 3,
      title: "Toyota test 2025",
      description: "Excelente estado, único dueño, pocos km.",
      price: 32000000,
      previousPrice: 27000000,
      currencyType: "$",
      condition: "Usado",
      year: 2020,
      km: 30000,
      color: "Blanco",
      neighborhood: "Palermo",
      transmission: "Automática",
      engine: "1.8L",
      fuelType: "Nafta",
      doors: "4",
      uniqueOwner: true,
      slugUrl: "toyota-corolla-2020",
      swap: false,
      ownerPhone: "123-456-7890",
      marketDiscount: true,
      personId: 1,
      cityId: 1,
      statusId: 1,
      vehicleCategoryId: 1,
      vehicleModelId: 2,
      vehicleMakeId: 1,
      vehicleVersionId: 3
    } as Publication;

    const createdPublication = await service.create(newPublication);
    assert.strictEqual(createdPublication.id, newPublication.id);
    assert.strictEqual(createdPublication.title, newPublication.title);
    assert.strictEqual(createdPublication.description, newPublication.description);
    assert.strictEqual(createdPublication.price, newPublication.price);
    assert.strictEqual(createdPublication.previousPrice, newPublication.previousPrice);
    assert.strictEqual(createdPublication.currencyType, newPublication.currencyType);
    assert.strictEqual(createdPublication.condition, newPublication.condition);
    assert.strictEqual(createdPublication.year, newPublication.year);
    assert.strictEqual(createdPublication.km, newPublication.km);
    assert.strictEqual(createdPublication.color, newPublication.color);
    assert.strictEqual(createdPublication.neighborhood, newPublication.neighborhood);
    assert.strictEqual(createdPublication.transmission, newPublication.transmission);
    assert.strictEqual(createdPublication.engine, newPublication.engine);
    assert.strictEqual(createdPublication.fuelType, newPublication.fuelType);
    assert.strictEqual(createdPublication.doors, newPublication.doors);
    assert.strictEqual(createdPublication.uniqueOwner, newPublication.uniqueOwner);
    assert.strictEqual(createdPublication.slugUrl, newPublication.slugUrl);
    assert.strictEqual(createdPublication.swap, newPublication.swap);
    assert.strictEqual(createdPublication.ownerPhone, newPublication.ownerPhone);
    assert.strictEqual(createdPublication.marketDiscount, newPublication.marketDiscount);
    assert.strictEqual(createdPublication.personId, newPublication.personId);
    assert.strictEqual(createdPublication.cityId, newPublication.cityId);
    assert.strictEqual(createdPublication.statusId, newPublication.statusId);
    assert.strictEqual(createdPublication.vehicleCategoryId, newPublication.vehicleCategoryId);
    assert.strictEqual(createdPublication.vehicleModelId, newPublication.vehicleModelId);
    assert.strictEqual(createdPublication.vehicleMakeId, newPublication.vehicleMakeId);
    assert.strictEqual(createdPublication.vehicleVersionId, newPublication.vehicleVersionId);


    const allPublication = await service.findAll();
    assert.strictEqual(allPublication.length, 3);
  });

  it("should update existing publication", async () => {
    const updatedData = { title: "Testing update TOYOTA", doors:"4" };
    const result = await service.update(1, updatedData);

    assert.strictEqual(result?.title, "Testing update TOYOTA");
    assert.strictEqual(result?.doors, "4");

    const publication = await service.findById(1);
    assert.strictEqual(publication?.title, "Testing update TOYOTA");
  });

  it("should return null when updating non-existent publication", async () => {
    const result = await service.update(999, { title: "TESTING FIND UPDATE" });
    assert.strictEqual(result, null);
  });

  it("should delete existing publication", async () => {
    await service.delete(2);
    const publication = await service.findById(2);
    assert.strictEqual(publication, null);
  });

  it("should throw error when deleting non-existent publication", async () => {
    await assert.rejects(
      async () => {
        await service.delete(999);
      },
      {
        name: "Error",
        message: "Publication not found.",
      }
    );
  });

  it("should find one publication by query", async () => {
    const publication = await service.findOne({ price: 32000000 });
    assert.strictEqual(publication?.id, 3);
    assert.strictEqual(publication?.color, "Blanco");
  });

  it("should return null when no match for findOne", async () => {
    const publication = await service.findOne({ title: "NO HAY TITULO" });
    assert.strictEqual(publication, null);
  });
});
