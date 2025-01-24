// src/models/VehicleVersion.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { VehicleModel } from "./VehicleModel";

class VehicleVersion extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly vehicleModel?: VehicleModel;
}

VehicleVersion.init(
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
    modelName: "VehicleVersion",
    tableName: "vehicleVersions",
  }
);

export { VehicleVersion };
