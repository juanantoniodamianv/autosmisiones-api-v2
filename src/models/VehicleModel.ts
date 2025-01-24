// src/models/VehicleModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { VehicleMake } from "./VehicleMake";
import { VehicleCategory } from "./VehicleCategory";
import { VehicleVersion } from "./VehicleVersion";

class VehicleModel extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly vehicleMake?: VehicleMake;
  public readonly vehicleCategory?: VehicleCategory;
  public readonly versions?: VehicleVersion[];
}

VehicleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VehicleModel",
    tableName: "vehicleModels",
  }
);

export { VehicleModel };
