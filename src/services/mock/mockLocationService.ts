import {
  City,
  ILocationService,
  Province,
} from "../interfaces/ILocationService";

export class MockLocationService implements ILocationService {
  private provinces: Province[] = [
    { id: 1, name: "Ontario" },
    { id: 2, name: "Quebec" },
    { id: 3, name: "British Columbia" },
    { id: 4, name: "Alberta" },
  ];

  private cities: City[] = [
    { id: 1, name: "Toronto", provinceId: 1 },
    { id: 2, name: "Ottawa", provinceId: 1 },
    { id: 3, name: "Montreal", provinceId: 2 },
    { id: 4, name: "Quebec City", provinceId: 2 },
    { id: 5, name: "Vancouver", provinceId: 3 },
    { id: 6, name: "Victoria", provinceId: 3 },
    { id: 7, name: "Calgary", provinceId: 4 },
    { id: 8, name: "Edmonton", provinceId: 4 },
  ];

  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
  }

  async getAllProvinces(): Promise<Province[]> {
    return this.simulateDelay([...this.provinces]);
  }

  async getCitiesByProvince(provinceId: number): Promise<City[]> {
    if (!provinceId) {
      return this.simulateDelay([]);
    }

    return this.simulateDelay(
      this.cities.filter((c) => c.provinceId === provinceId)
    );
  }
}
