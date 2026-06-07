const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do MySQL com dados do Workbench
const pool = mysql.createPool({
  host: "127.0.0.1",   // Hostname do Workbench
  port: 3306,          // Porta padrão do MySQL
  user: "root",        // Usuário do Workbench
  password: "1234", // Senha do usuário root
  database: "turismo"  // Nome do banco que você criou
});

// Rota para receber os dados do formulário
app.post("/send", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    // Salvar no banco de dados
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)",
      [nome, email, mensagem]
    );
    conn.release();

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tavc02@gmail.com",
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: "tavc02@gmail.com",
      subject: `Contato do site - ${nome}`,
      text: mensagem
    };

    await transporter.sendMail(mailOptions);

    res.json({ mensagem: "Mensagem enviada e salva com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao enviar/salvar mensagem." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
