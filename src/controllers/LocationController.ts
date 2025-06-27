import { Request, Response, NextFunction } from "express";

export interface ILocationService {
  getAllProvinces(): Promise<any[]>;
  getCitiesByProvince(provinceId: number): Promise<any[]>;
}

export class LocationController {
  private locationService: ILocationService;

  constructor(locationService: ILocationService) {
    this.locationService = locationService;
  }

  getAllProvinces = async (req: Request, res: Response, next: NextFunction) => {
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

  getCitiesByProvince = async (
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
        Number(provinceId)
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
