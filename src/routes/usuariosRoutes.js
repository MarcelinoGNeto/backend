import express from "express";
import UsuarioController from "../controller/usuarioController.js";
import jwt from 'jsonwebtoken';

const routes = express.Router();

routes.get("/usuarios/:id", verificaToken, UsuarioController.listarUsuarioPorId);
routes.post("/usuarios", UsuarioController.cadastrarUsuario);
routes.put("/usuarios/:id", UsuarioController.atualizarUsuario);
routes.delete("/usuarios/:id", UsuarioController.excluirUsuario);
routes.post("/login", UsuarioController.loginUsuario);

function verificaToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try{
    const secret = process.env.SECRET
    jwt.verify(token, secret)

    next()
  }catch(erro){
    console.log("erro: ao validar token: ", erro)
    res.status(400).json({ message: "Token inválido!" })
  }
}

export default routes;
