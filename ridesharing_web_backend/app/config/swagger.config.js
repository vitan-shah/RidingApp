const schemas = require("../../docs/schema/index");
const paths = require("../../docs/path/index");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SE Backend",
    description: "All Apis for integration",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
    {
      url: "https://se-backend-gid-8-2022.herokuapp.com",
      description: "Testing Server",
    },
  ],
  tags: [
    {
      name: "Auth", // name of a tag
      description: "API to manage Authentication",
    },
    {
      name: "User", // name of a tag
      description: "API to manage User",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
    schemas: {
      ...schemas,
    },
  },
  paths: {
    ...paths,
  },
  apis: ["./app/routes/*.js"],
};

module.exports = swaggerDefinition;
