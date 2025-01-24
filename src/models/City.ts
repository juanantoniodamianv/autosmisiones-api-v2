// src/models/City.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class City extends Model {
  public id!: number;
  public name!: string;
  public provinceId!: number;
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

export { City };
