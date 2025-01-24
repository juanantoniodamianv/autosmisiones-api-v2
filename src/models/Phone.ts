// src/models/Phone.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Person } from "./Person";

class Phone extends Model {
  public id!: number;
  public phone!: string;
  public type!: string;
  public verified!: boolean;
  public verifiedToken!: string;

  // Relaciones
  public readonly person?: Person;
}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "wp",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifiedToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Phone",
    tableName: "phones",
  }
);

// Relación belongsTo con Person
Phone.belongsTo(Person, { foreignKey: "personId", as: "person" });

export { Phone };
