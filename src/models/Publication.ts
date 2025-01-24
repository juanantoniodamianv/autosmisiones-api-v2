// src/models/Publication.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Person } from "./Person";
import { City } from "./City";
import { Status } from "./Status";
import { VehicleVersion } from "./VehicleVersion";
import { VehicleCategory } from "./VehicleCategory";
import { PublicationMediaResource } from "./PublicationMediaResource";
import { VehicleCustomData } from "./VehicleCustomData";

class Publication extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public previousPrice!: number;
  public currencyType!: string;
  public condition!: string;
  public year!: number;
  public km!: number;
  public color!: string;
  public neighborhood!: string;
  public transmission!: string;
  public engine!: string;
  public fuelType!: string;
  public doors!: string;
  public uniqueOwner!: boolean;
  public slugUrl!: string;
  public swap!: boolean;
  public ownerPhone!: string;
  public marketDiscount!: boolean;

  // Relaciones
  public readonly person?: Person;
  public readonly city?: City;
  public readonly status?: Status;
  public readonly vehicleVersion?: VehicleVersion;
  public readonly vehicleCategory?: VehicleCategory;
  public readonly publicationMediaResources?: PublicationMediaResource[];
  public readonly vehicleCustomData?: VehicleCustomData;
}

Publication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    previousPrice: {
      type: DataTypes.FLOAT,
    },
    currencyType: {
      type: DataTypes.STRING,
      defaultValue: "$",
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    km: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    transmission: {
      type: DataTypes.STRING,
    },
    engine: {
      type: DataTypes.STRING,
    },
    fuelType: {
      type: DataTypes.STRING,
    },
    doors: {
      type: DataTypes.STRING,
    },
    uniqueOwner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    slugUrl: {
      type: DataTypes.STRING,
      unique: true,
    },
    swap: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ownerPhone: {
      type: DataTypes.STRING,
    },
    marketDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Publication",
    tableName: "publications",
  }
);

// Relaciones
Publication.belongsTo(Person, { foreignKey: "personId", as: "person" });
Publication.belongsTo(City, { foreignKey: "cityId", as: "city" });
Publication.belongsTo(Status, { foreignKey: "statusId", as: "status" });
Publication.belongsTo(VehicleVersion, {
  foreignKey: "vehicleVersionId",
  as: "vehicleVersion",
});
Publication.belongsTo(VehicleCategory, {
  foreignKey: "vehicleCategoryId",
  as: "vehicleCategory",
});
Publication.hasMany(PublicationMediaResource, {
  foreignKey: "publicationId",
  as: "publicationMediaResources",
});
Publication.hasOne(VehicleCustomData, {
  foreignKey: "publicationId",
  as: "vehicleCustomData",
});

export { Publication };
