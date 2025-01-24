// src/models/City.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Province } from "./Province";

class City extends Model {
  public id!: number;
  public name!: string;
  public provinceId!: number;

  // Relaciones
  public readonly province?: Province;
}

City.init(
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
    provinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "City",
    tableName: "cities",
  }
);

// Relación belongsTo con Province
City.belongsTo(Province, {
  foreignKey: "provinceId",
  as: "province",
});

export { City };
