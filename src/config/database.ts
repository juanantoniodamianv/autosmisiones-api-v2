import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres", // o "mysql", "sqlite", "mssql"
});

export { sequelize };
