import { API_URL } from "./env";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "AutosMisiones API",
    version: "1.0.0",
    description: "API documentation for AutosMisiones platform - Vehicle marketplace API",
    contact: {
      name: "AutosMisiones Support",
      email: "support@autosmisiones.com"
    }
  },
  servers: [
    {
      url: API_URL,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token for authentication. Include 'Bearer ' followed by your token."
      }
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message"
          },
          status: {
            type: "integer",
            description: "HTTP status code"
          }
        }
      },
      Person: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Person ID"
          },
          name: {
            type: "string",
            description: "Person's full name"
          },
          email: {
            type: "string",
            format: "email",
            description: "Person's email address"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp"
          }
        }
      },
      Phone: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Phone ID"
          },
          number: {
            type: "string",
            description: "Phone number"
          },
          type: {
            type: "string",
            description: "Type of phone (mobile, landline, etc.)"
          },
          isPrimary: {
            type: "boolean",
            description: "Whether this is the primary phone number"
          },
          personId: {
            type: "integer",
            description: "ID of the person who owns this phone"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp"
          }
        }
      },
      Publication: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Publication ID"
          },
          title: {
            type: "string",
            description: "Publication title"
          },
          description: {
            type: "string",
            description: "Publication description"
          },
          price: {
            type: "number",
            description: "Vehicle price"
          },
          condition: {
            type: "string",
            description: "Vehicle condition"
          },
          year: {
            type: "number",
            description: "Vehicle year"
          },
          km: {
            type: "number",
            description: "Vehicle kilometers"
          },
          statusId: {
            type: "integer",
            description: "Publication status ID"
          },
          personId: {
            type: "integer",
            description: "ID of the person who created the publication"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp"
          }
        }
      }
    }
  },
  tags: [
    {
      name: "People",
      description: "User management operations"
    },
    {
      name: "Phones",
      description: "Phone number management operations"
    },
    {
      name: "Publications",
      description: "Vehicle publication management operations"
    }
  ]
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.ts"], // Path to the route files with JSDoc comments
};

export default swaggerOptions;
