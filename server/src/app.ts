import express from "express";
import http from "http";

import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import * as socketManager from "./socketManager";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(express.json());
app.use(cors());

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

const server = http.createServer(app);
const serverPort = 3000;

const io = socketManager.init(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("loadClub", (clubId) => {
    socket.join(clubId);
    console.log(`A user loaded club ${clubId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(serverPort, () => {
  console.log(`Express is listening at http://localhost:${serverPort}`);
});
