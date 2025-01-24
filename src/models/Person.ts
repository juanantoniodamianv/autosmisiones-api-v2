// src/models/Person.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Phone } from "./Phone";
import { Favorite } from "./Favorite";
import { PersonMediaResource } from "./PersonMediaResource";

class Person extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public maxPublications!: number;
  public openingHours!: string;
  public locationStreet!: string;

  // Relaciones
  public readonly phones?: Phone[];
  public readonly favorites?: Favorite[];
  public readonly personMediaResources?: PersonMediaResource[];
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    maxPublications: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    openingHours: {
      type: DataTypes.STRING,
    },
    locationStreet: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Person",
    tableName: "people",
  }
);

export { Person };
