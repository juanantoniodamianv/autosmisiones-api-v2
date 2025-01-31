import { ILocationService } from "../controllers/LocationController";
import { CityRepository } from "../repositories/City";
import { ProvinceRepository } from "../repositories/Province";

export class LocationService implements ILocationService {
  province = new ProvinceRepository();
  city = new CityRepository();

  // TODO: should we use a proper response typing here, ex: Promise<Province[]>
  async getAllProvinces(): Promise<
    {
      name: string;
      id: number;
    }[]
  > {
    return await this.province.findAll();
  }

  // TODO: same here
  async getCitiesByProvince(
    provinceId: string
  ): Promise<{ name: string; id: number; provinceId: number }[]> {
    return await this.city.findAll({ provinceId: provinceId });
  }
}
