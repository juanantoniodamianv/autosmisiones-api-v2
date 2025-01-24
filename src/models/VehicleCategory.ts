// src/models/VehicleCategory.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { VehicleModel } from "./VehicleModel";

class VehicleCategory extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly models?: VehicleModel[];
}

VehicleCategory.init(
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
    modelName: "VehicleCategory",
    tableName: "vehicleCategories",
  }
);

export { VehicleCategory };
