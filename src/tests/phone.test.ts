import { describe, before, it } from "node:test";
import assert from "assert";
import { MockPhoneService } from "../services/mock/mockPhoneService";

describe("Phone Service", () => {
  let service: MockPhoneService;

  before(() => {
    service = new MockPhoneService();
  });

  it("should return all phones for a user", async () => {
    const phones = await service.getAllPhones("1");
    assert.strictEqual(phones.length, 2);
    assert.strictEqual(phones[0].phone, "+1234567890");
    assert.strictEqual(phones[1].phone, "+0987654321");
  });

  it("should return empty array for user with no phones", async () => {
    const phones = await service.getAllPhones("999");
    assert.strictEqual(phones.length, 0);
  });

  it("should create a new phone", async () => {
    const newPhone = {
      phone: "+5555555555",
      type: "wp",
    };

    const createdPhone = await service.createPhone("1", newPhone);
    assert.strictEqual(createdPhone.id, 4);
    assert.strictEqual(createdPhone.phone, newPhone.phone);
    assert.strictEqual(createdPhone.type, newPhone.type);
    assert.strictEqual(createdPhone.verified, false);
    assert.strictEqual(createdPhone.personId, 1);

    const userPhones = await service.getAllPhones("1");
    assert.strictEqual(userPhones.length, 3);
  });

  it("should update existing phone", async () => {
    const updatedData = {
      phone: "+9999999999",
      verified: true,
    };

    const result = await service.updatePhone("1", 1, updatedData);
    assert.strictEqual(result.phone, updatedData.phone);
    assert.strictEqual(result.verified, updatedData.verified);
    assert.strictEqual(result.type, "wp"); // Existing field remains

    const phones = await service.getAllPhones("1");
    const updatedPhone = phones.find((p) => p.id === 1);
    assert.strictEqual(updatedPhone?.phone, updatedData.phone);
  });

  it("should throw error when updating non-existent phone", async () => {
    await assert.rejects(
      async () => {
        await service.updatePhone("1", 999, { phone: "+9999999999" });
      },
      {
        name: "Error",
        message: "Phone not found",
      }
    );
  });

  it("should throw error when updating phone from different user", async () => {
    await assert.rejects(
      async () => {
        await service.updatePhone("2", 1, { phone: "+9999999999" });
      },
      {
        name: "Error",
        message: "Phone not found",
      }
    );
  });

  it("should delete existing phone", async () => {
    await service.deletePhone("1", 1);
    const phones = await service.getAllPhones("1");
    assert.strictEqual(phones.length, 2);
    assert.strictEqual(phones.find((p) => p.id === 1), undefined);
  });

  it("should throw error when deleting non-existent phone", async () => {
    await assert.rejects(
      async () => {
        await service.deletePhone("1", 999);
      },
      {
        name: "Error",
        message: "Phone not found",
      }
    );
  });

  it("should throw error when deleting phone from different user", async () => {
    await assert.rejects(
      async () => {
        await service.deletePhone("2", 1);
      },
      {
        name: "Error",
        message: "Phone not found",
      }
    );
  });
}); 