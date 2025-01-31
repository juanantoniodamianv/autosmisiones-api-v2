export interface ILocationService {
  getAllProvinces(): Promise<any[]>;
  getCitiesByProvince(provinceId: string): Promise<any[]>;
}

export interface Province {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  provinceId: string;
}
