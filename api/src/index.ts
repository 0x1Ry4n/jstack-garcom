import express from "express";
import path from "node:path";
import cors from "cors";
import http from "node:http";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { router } from "./interfaces/http/routes/index.routes";

const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    const port = 3000;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);

    server.listen(port, () => {
      console.log(`Rodando API na porta ${port}`);
    });
  })
  .catch((e) => console.warn(`Erro ao conectar no banco de dados mongoDB: ${e}`));
