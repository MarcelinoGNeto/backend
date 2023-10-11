import express from "express";
import saida from "./saidasRoutes.js"
import produto from "./produtosRoutes.js";
import usuario from "./usuariosRoutes.js"

export const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Bem-vindo à API ControleStock"));

  app.use(express.json(), saida, produto, usuario);
};
