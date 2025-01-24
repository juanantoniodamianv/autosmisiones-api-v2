// src/models/VehicleMake.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { VehicleModel } from "./VehicleModel";

class VehicleMake extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly models?: VehicleModel[];
}

VehicleMake.init(
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
    modelName: "VehicleMake",
    tableName: "vehicleMakes",
  }
);

// Relación hasMany con VehicleModel
VehicleMake.hasMany(VehicleModel, {
  foreignKey: "vehicleMakeId",
  as: "models",
});

export { VehicleMake };
