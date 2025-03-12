import { API_URL } from "./env";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation using Swagger",
  },
  servers: [
    {
      url: API_URL,
      description: "Local server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the route files with JSDoc comments
};

export default swaggerOptions;
