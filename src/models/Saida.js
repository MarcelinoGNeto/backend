import mongoose from "mongoose";
import { produtoSchema } from "./Produto.js"

const saidaSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    destinatario: { type: String },
    criadoEm: { type: Date, default: Date.now },
    produtos: [produtoSchema]
}, { versionKey: false });

const saida = mongoose.model("saidas", saidaSchema);

export { saida, saidaSchema };