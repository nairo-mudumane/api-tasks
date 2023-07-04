import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./services";

dotenv.config();
const port = process.env.PORT;
const server = express();

server.use(cors());
server.use(express.json());

connectToDatabase().then(() =>
  server.listen(port, () => console.log("server running"))
);
