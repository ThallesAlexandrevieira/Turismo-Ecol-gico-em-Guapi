// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para receber o formulário
app.post("/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log("Novo contato recebido:");
  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Mensagem:", mensagem);

  // Aqui você pode salvar em um banco de dados ou enviar por e-mail
  res.json({ sucesso: true, mensagem: "Contato enviado com sucesso!" });
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor do Turismo Ecológico está rodando!");
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
