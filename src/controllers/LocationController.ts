import { Request, Response, NextFunction } from "express";

export interface ILocationService {
  getAllProvinces(): Promise<any[]>;
  getCitiesByProvince(categoryId: string): Promise<any[]>;
}

export class LocationController {
  private locationService: ILocationService;

  constructor(locationService: ILocationService) {
    this.locationService = locationService;
  }

  public getAllProvinces = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const provinces = await this.locationService.getAllProvinces();
      res.status(200).json({
        success: true,
        count: provinces.length,
        data: provinces,
      });
    } catch (err) {
      next(err);
    }
  };

  public getCitiesByProvince = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { provinceId } = req.query;

      if (!provinceId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a provinceId query parameter",
        });
      }
      const cities = await this.locationService.getCitiesByProvince(
        provinceId.toString()
      );
      res.status(200).json({
        success: true,
        count: cities.length,
        data: cities,
      });
    } catch (err) {
      next(err);
    }
  };
}
