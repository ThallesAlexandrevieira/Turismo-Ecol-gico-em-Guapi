// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco (Render fornece a DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para receber o formulário
app.post("/contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    await pool.query(
      "INSERT INTO contatos (nome, email, mensagem) VALUES ($1, $2, $3)",
      [nome, email, mensagem]
    );
    res.json({ sucesso: true, mensagem: "Contato salvo com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao salvar contato." });
  }
});

// Rota para listar contatos (admin)
app.get("/contatos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contatos ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar contatos." });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
