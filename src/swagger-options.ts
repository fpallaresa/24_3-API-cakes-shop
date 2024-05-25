import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node S15",
      version: "1.0.0",
      description: "This is the Cake Shop API ",
      license: {
        name: "MIT",
        url: "https://web.mit.edu/",
      },
      contact: {
        name: "Francesc Pallares",
        url: "https://github.com/fpallaresa",
        email: "francescpallares@gmail.com"
      }
    },
    server: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [
    "./src/**/*.ts",
  ]
};
