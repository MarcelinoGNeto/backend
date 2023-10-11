import { usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioController {

  static async listarUsuarioPorId(req, res) {
    try {
      const id = req.params.id;

      const usuarioEncontrado = await usuario.findById(id, "-password");

      if(!usuarioEncontrado){
        return res.status(404).json({ message: "Usuário não encontrado!" })
      }

      res.status(200).json(usuarioEncontrado);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao buscar usuário` });
    }
  }

  static async cadastrarUsuario(req, res) {
    const { nome, email, password, confirmaPassword } = req.body;

    if (!nome) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatório!" });
    }

    if (password !== confirmaPassword) {
      return res.status(422).json({ message: "As senhas não conferem!" });
    }

    const usuarioExistente = await usuario.findOne({ email: email });

    if (usuarioExistente) {
      return res
        .status(422)
        .json({ message: "Por favor, utilize outro email!" });
    }

    //Cria senha com hash
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //cria usuário
    const novoUsuario = new usuario({
      nome,
      email,
      password: passwordHash,
    });

    try {
      await novoUsuario.save();
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", usuario: novoUsuario });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({
        message:
          "Aconteceu algum erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "usuário atualizado!" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização do usuário` });
    }
  }

  static async excluirUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndDelete(id);
      res.status(200).json({ message: "usuário excluído com sucesso" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na exclusão do produto` });
    }
  }

  static async loginUsuario(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatório!" });
    }

    const emailUsuario = await usuario.findOne({ email: email });

    if (!emailUsuario) {
      return res.status(404).json({ message: "Email não cadastrado!" });
    }

    const verificaPassword = await bcrypt.compare(
      password,
      emailUsuario.password
    );

    if (!verificaPassword) {
      return res.status(422).json({ message: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: emailUsuario._id,
        },
        secret
      );

      res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso", token });

    } catch (erro) {
      console.log(erro);
      res
        .status(500)
        .json({
          message:
            "Aconteceu algum erro no servidor, tente novamente mais tarde!",
        });
    }
  }
  
}

export default UsuarioController;
