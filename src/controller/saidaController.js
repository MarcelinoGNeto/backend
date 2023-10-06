import { produto } from "../models/Produto.js";
import { saida } from "../models/Saida.js";

class SaidaController {
  static async listarSaidas(req, res) {
    try {
      const listaSaidas = await saida.find({});
      res.status(200).json(listaSaidas);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarSaidaPorId(req, res) {
    try {
      const id = req.params.id;
      const saidaEncontrada = await saida.findById(id);
      res.status(200).json(saidaEncontrada);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição da saida` });
    }
  }

  static async listarSaidaPorDestinatario(req, res) {
    const destinatario = req.query.destinatario;
    try {
      const saidaPorDestinatario = await saida.find({ destinatario: destinatario });
      res.status(200).json(saidaPorDestinatario);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na busca pelo destinatário` });
    }
  }

  static async cadastrarSaida(req, res) {
    const novaSaida = req.body;
  
    try {
      const produtosIds = novaSaida.produtos; // Obtém os IDs dos produtos do corpo da requisição
  
      // Verifica se os IDs de produtos são válidos
      const produtosEncontrados = await produto.find({ _id: { $in: produtosIds } });
  
      if (produtosEncontrados.length !== produtosIds.length) {
        // Verifica se todos os produtos foram encontrados
        return res.status(404).json({ message: "Um ou mais produtos não foram encontrados" });
      }
  
      // Cria a saída com os produtos encontrados
      const saidaCompleta = {
        destinatario: novaSaida.destinatario,
        produtos: novaSaida.produtos,
      };
  
      const saidaCriada = await saida.create(saidaCompleta);
      res
        .status(201)
        .json({ message: "Saída criada com sucesso", saida: saidaCriada });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao cadastrar saída` });
    }
  }
  
  static async atualizarSaida(req, res) {
    try {
      const id = req.params.id;
      await saida.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "saída atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização da saída` });
    }
  }

  static async excluirSaida(req, res) {
    try {
      const id = req.params.id;
      await saida.findByIdAndDelete(id);
      res.status(200).json({ message: "saída excluída com sucesso" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na exclusão da saída` });
    }
  }
}

export default SaidaController;
