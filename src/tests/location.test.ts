import { describe, before, it } from "node:test";
import assert from "assert";

import { MockLocationService } from "../services/mock/mockLocationService";

describe("Location Service", () => {
  let service: MockLocationService;

  before(() => {
    service = new MockLocationService();
  });

  it("should return all provinces", async () => {
    const provinces = await service.getAllProvinces();
    assert.strictEqual(provinces.length, 4);
    assert.strictEqual(provinces[0].name, "Ontario");
  });

  it("should return cities for province", async () => {
    const cities = await service.getCitiesByProvince("1");
    assert.strictEqual(cities.length, 2);
    assert.strictEqual(cities[0].name, "Toronto");
  });
});
