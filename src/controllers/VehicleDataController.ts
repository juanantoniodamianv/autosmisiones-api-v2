import { Request, Response, NextFunction } from "express";

export interface IVehicleDataService {
  getAllCategories(): Promise<any[]>;
  getCategoryById(id: string): Promise<any>;
  getMakesByCategory(categoryId: string): Promise<any[]>;
  getMakeById(id: string): Promise<any>;
  getModelsByMake(makeId: string): Promise<any[]>;
  getModelById(id: string): Promise<any>;
  getVersionsByModel(modelId: string): Promise<any[]>;
  getVersionById(id: string): Promise<any>;
}

export class VehicleDataController {
  private vehicleDataService: IVehicleDataService;

  constructor(vehicleDataService: IVehicleDataService) {
    this.vehicleDataService = vehicleDataService;
  }

  /**
   * @desc    Get all vehicle categories
   * @route   GET /api/v1/categories
   */
  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await this.vehicleDataService.getAllCategories();
      res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get single category by ID
   * @route   GET /api/v1/categories/:categoryId
   */
  public getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const category = await this.vehicleDataService.getCategoryById(
        req.params.categoryId
      );

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get makes by category ID (from query parameter)
   * @route   GET /api/v1/makes?categoryId=:id
   */
  public getMakesByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { categoryId } = req.query;

      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a categoryId query parameter",
        });
      }

      const makes = await this.vehicleDataService.getMakesByCategory(
        categoryId.toString()
      );
      res.status(200).json({
        success: true,
        count: makes.length,
        data: makes,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get single make by ID
   * @route   GET /api/v1/makes/:makeId
   */
  public getMakeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const make = await this.vehicleDataService.getMakeById(req.params.makeId);

      if (!make) {
        return res.status(404).json({
          success: false,
          message: "Make not found",
        });
      }

      res.status(200).json({
        success: true,
        data: make,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get models by make ID (from query parameter)
   * @route   GET /api/v1/models?makeId=:id
   */
  public getModelsByMake = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { makeId } = req.query;

      if (!makeId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a makeId query parameter",
        });
      }

      const models = await this.vehicleDataService.getModelsByMake(
        makeId.toString()
      );
      res.status(200).json({
        success: true,
        count: models.length,
        data: models,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get single model by ID
   * @route   GET /api/v1/models/:modelId
   */
  public getModelById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model = await this.vehicleDataService.getModelById(
        req.params.modelId
      );

      if (!model) {
        return res.status(404).json({
          success: false,
          message: "Model not found",
        });
      }

      res.status(200).json({
        success: true,
        data: model,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get versions by model ID (from query parameter)
   * @route   GET /api/v1/versions?modelId=:id
   */
  public getVersionsByModel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { modelId } = req.query;

      if (!modelId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a modelId query parameter",
        });
      }

      const versions = await this.vehicleDataService.getVersionsByModel(
        modelId.toString()
      );
      res.status(200).json({
        success: true,
        count: versions.length,
        data: versions,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get single version by ID
   * @route   GET /api/v1/versions/:versionId
   */
  public getVersionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const version = await this.vehicleDataService.getVersionById(
        req.params.versionId
      );

      if (!version) {
        return res.status(404).json({
          success: false,
          message: "Version not found",
        });
      }

      res.status(200).json({
        success: true,
        data: version,
      });
    } catch (err) {
      next(err);
    }
  };
}
