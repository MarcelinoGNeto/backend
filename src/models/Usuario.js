import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    email: {type: String},
    password: { type: String },
  },
  { versionKey: false }
);

const usuario = mongoose.model("usuarios", usuarioSchema);

export { usuario, usuarioSchema };
