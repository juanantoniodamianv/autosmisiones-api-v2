// src/models/Province.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { City } from "./City";

class Province extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly cities?: City[];
}

Province.init(
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
    modelName: "Province",
    tableName: "provinces",
  }
);

// Relación hasMany con City
Province.hasMany(City, {
  foreignKey: "provinceId",
  as: "cities",
});

export { Province };
