import { produto } from "../models/Produto.js";

class ProdutoController {
  static async listarProdutos(req, res) {
    try {
      const listaProdutos = await produto.find({});
      res.status(200).json(listaProdutos);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarProdutoPorId(req, res) {
    try {
      const id = req.params.id;
      const produtoEncontrado = await produto.findById(id);
      res.status(200).json(produtoEncontrado);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do produto` });
    }
  }

  static async cadastrarProduto(req, res) {
    try {
      const novoProduto = await produto.create(req.body);
      res
        .status(201)
        .json({ message: "produto criado com sucesso", produto: novoProduto });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar produto` });
    }
  }
  
  static async atualizarProduto(req, res) {
    try {
      const id = req.params.id;
      await produto.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "produto atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização do produto` });
    }
  }

  static async excluirProduto(req, res) {
    try {
      const id = req.params.id;
      await produto.findByIdAndDelete(id);
      res.status(200).json({ message: "produto excluído com sucesso" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na exclusão do produto` });
    }
  }
}

export default ProdutoController;
