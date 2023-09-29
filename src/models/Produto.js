import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    genero: { type: String },
    medida: { type: String },
    quantidade: { type: Number },
  },
  { versionKey: false }
);

const produto = mongoose.model("produtos", produtoSchema);

export { produto, produtoSchema };
