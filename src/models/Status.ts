// src/models/Status.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Status extends Model {
  public id!: number;
  public name!: string;
}

Status.init(
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
    modelName: "Status",
    tableName: "statuses",
  }
);

export { Status };
