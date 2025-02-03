import { IVehicleDataService } from "../../controllers/VehicleDataController";
import {
  Category,
  Make,
  Model,
  Version,
} from "../interfaces/IVehicleDataService";

export class MockVehicleDataService implements IVehicleDataService {
  // Mock data storage
  private categories: Category[] = [
    { id: "1", name: "Passenger Vehicles", slug: "passenger" },
    { id: "2", name: "Commercial Vehicles", slug: "commercial" },
  ];

  private makes: Make[] = [
    { id: "1", name: "Toyota", categoryId: "1" },
    { id: "2", name: "Ford", categoryId: "1" },
    { id: "3", name: "Freightliner", categoryId: "2" },
  ];

  private models: Model[] = [
    { id: "1", name: "Camry", makeId: "1" },
    { id: "2", name: "Corolla", makeId: "1" },
    { id: "3", name: "F-150", makeId: "2" },
    { id: "4", name: "Cascadia", makeId: "3" },
  ];

  private versions: Version[] = [
    { id: "1", name: "LE", modelId: "1", year: 2023, engine: "2.5L I4" },
    { id: "2", name: "SE", modelId: "1", year: 2023, engine: "3.5L V6" },
    { id: "3", name: "Hybrid", modelId: "2", year: 2024 },
    {
      id: "4",
      name: "Platinum",
      modelId: "3",
      year: 2024,
      engine: "3.5L EcoBoost",
    },
  ];

  // Simulate async database operations
  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
  }

  async getAllCategories(): Promise<any[]> {
    return this.simulateDelay([...this.categories]);
  }

  async getCategoryById(id: string): Promise<any> {
    return this.simulateDelay(this.categories.find((c) => c.id === id) || null);
  }

  async getMakesByCategory(categoryId: string): Promise<any[]> {
    return this.simulateDelay(
      this.makes.filter((m) => m.categoryId === categoryId)
    );
  }

  async getMakeById(id: string): Promise<any> {
    return this.simulateDelay(this.makes.find((m) => m.id === id) || null);
  }

  async getModelsByMake(makeId: string): Promise<any[]> {
    return this.simulateDelay(this.models.filter((m) => m.makeId === makeId));
  }

  async getModelById(id: string): Promise<any> {
    return this.simulateDelay(this.models.find((m) => m.id === id) || null);
  }

  async getVersionsByModel(modelId: string): Promise<any[]> {
    return this.simulateDelay(
      this.versions.filter((v) => v.modelId === modelId)
    );
  }

  async getVersionById(id: string): Promise<any> {
    return this.simulateDelay(this.versions.find((v) => v.id === id) || null);
  }
}
