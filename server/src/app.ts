import express from "express";

import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(express.json());
app.use(cors());
const serverPort = 3000;

app.use("/api", routes);

//API documentation setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ClubHub API Docs",
      version: "1.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//Serve static front-end
const clientBuild = path.join(__dirname, "../../client/dist");
app.use(express.static(clientBuild));

app.listen(serverPort, () => {
  return console.log(`Express is listening at http://localhost:${serverPort}`);
});
