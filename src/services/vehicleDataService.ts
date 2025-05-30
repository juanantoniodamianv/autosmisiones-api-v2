import { IVehicleDataService } from "../controllers/VehicleDataController";
import { VehicleCategoryRepository } from "../repositories/VehicleCategory";
import { VehicleMakeRepository } from "../repositories/VehicleMake";
import { VehicleModelRepository } from "../repositories/VehicleModel";
import { VehicleVersionRepository } from "../repositories/VehicleVersion";

export class VehicleDataService implements IVehicleDataService {
  category = new VehicleCategoryRepository();
  make = new VehicleMakeRepository();
  model = new VehicleModelRepository();
  version = new VehicleVersionRepository();

  // TODO: correct response types
  async getAllCategories(): Promise<any[]> {
    return await this.category.findAll();
  }

  async getCategoryById(id: string): Promise<any> {
    return await this.category.findById(parseInt(id));
  }

  async getMakesByCategory(categoryId: string): Promise<any[]> {
    return await this.make.findAll({ categoryId: categoryId });
  }

  async getMakeById(id: string): Promise<any> {
    return await this.make.findById(parseInt(id));
  }

  async getModelsByMake(makeId: string): Promise<any[]> {
    return await this.model.findAll({ makeId: makeId });
  }

  async getModelById(id: string): Promise<any> {
    return await this.model.findById(parseInt(id));
  }

  async getVersionsByModel(modelId: string): Promise<any[]> {
    return await this.version.findAll({ modelId: modelId });
  }

  async getVersionById(id: string): Promise<any> {
    return await this.version.findById(parseInt(id));
  }
}
