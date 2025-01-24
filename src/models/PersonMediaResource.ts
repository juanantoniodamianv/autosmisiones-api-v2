// src/models/PersonMediaResource.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Person } from "./Person";

class PersonMediaResource extends Model {
  public id!: number;
  public url!: string;
  public imageType!: string;

  // Relaciones
  public readonly person?: Person;
}

PersonMediaResource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PersonMediaResource",
    tableName: "personMediaResources",
  }
);

// Relación belongsTo con Person
PersonMediaResource.belongsTo(Person, {
  foreignKey: "personId",
  as: "person",
});

export { PersonMediaResource };
