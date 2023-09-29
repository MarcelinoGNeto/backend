import express from "express";
import { connectaNaDataBase } from "./config/dbConnect.js";
import { routes } from "./routes/index.js"
import cors from "cors";

const conexao = await connectaNaDataBase();

conexao.on("error", (erro) => {
  console.log("erro de conexão: ", erro);
});

conexao.once("open", () => {
  console.log("Conexão com bd feita com sucesso!");
});

export const app = express();
app.use(cors({ origin: "*" }));

routes(app);

