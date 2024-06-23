import swaggerAutoGen from "swagger-autogen";
import swaggerHandler from "../utilities/swaggerHandler.js";
const doc = {
  info: {
    title: "My API",
    description: "API documentation",
  },
  host: "localhost:5000",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/app/controllers/v1/**.js"]; // Include all your endpoint files here
const swaggerAutoGenInstance = swaggerAutoGen();

await swaggerAutoGenInstance(outputFile, endpointsFiles, doc);
swaggerHandler.updateSwaggerDoc();
