import express from "express";
import saida from "./saidasRoutes.js"
import produto from "./produtosRoutes.js";

export const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Todos os produtos"));

  app.use(express.json(), saida, produto);
};
