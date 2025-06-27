import { ILocationService } from "../controllers/LocationController";
import { CityRepository } from "../repositories/City";
import { ProvinceRepository } from "../repositories/Province";
import { City, Province } from "./interfaces/ILocationService";

export class LocationService implements ILocationService {
  province = new ProvinceRepository();
  city = new CityRepository();

  async getAllProvinces(): Promise<
    Province[]
  > {
    return await this.province.findAll();
  }

  async getCitiesByProvince(
    provinceId: number
  ): Promise<City[]> {
    return await this.city.findAll({ provinceId: provinceId });
  }
}
