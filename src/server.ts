import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./services";
import ServerRoutes from "./routes";

dotenv.config();
const port = process.env.PORT;
const server = express();

server.use(cors());
server.use(express.json());
ServerRoutes(server);

connectToDatabase().then(() =>
  server.listen(port, () => console.log("server running"))
);
