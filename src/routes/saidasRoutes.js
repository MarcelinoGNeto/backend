import express from "express";
import SaidaController from "../controller/saidaController.js";

const routes = express.Router();

routes.get("/saidas", SaidaController.listarSaidas);
routes.get("/saidas/busca", SaidaController.listarSaidaPorDestinatario);
routes.get("/saidas/:id", SaidaController.listarSaidaPorId);
routes.post("/saidas", SaidaController.cadastrarSaida);
routes.put("/saidas/:id", SaidaController.atualizarSaida);
routes.delete("/saidas/:id", SaidaController.excluirSaida);
export default routes;
