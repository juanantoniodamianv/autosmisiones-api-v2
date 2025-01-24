// src/models/VehicleCustomData.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Publication } from "./Publication";

class VehicleCustomData extends Model {
  public id!: number;
  public make!: string;
  public model!: string;
  public version!: string;

  // Relaciones
  public readonly publication?: Publication;
}

VehicleCustomData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "VehicleCustomData",
    tableName: "vehicleCustomData",
  }
);

export { VehicleCustomData };
