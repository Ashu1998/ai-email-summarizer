import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "AI Email Summarizer API",
    version: "1.0.0",
    description: "API to fetch and summarize Gmail emails using Gemini Pro",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // path to the route files with Swagger comments
});