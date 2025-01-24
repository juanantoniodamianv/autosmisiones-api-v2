// src/models/Province.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Province extends Model {
  public id!: number;
  public name!: string;
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

export { Province };
