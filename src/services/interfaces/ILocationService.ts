export interface ILocationService {
  getAllProvinces(): Promise<any[]>;
  getCitiesByProvince(provinceId: number): Promise<any[]>;
}

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  provinceId: number;
}
