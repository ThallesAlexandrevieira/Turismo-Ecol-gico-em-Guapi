const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post("/send", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail", // pode usar outro serviço
      auth: {
        user: process.env.EMAIL_USER, // seu e-mail
        pass: process.env.EMAIL_PASS  // sua senha ou app password
      }
    });

    // Configuração da mensagem
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // seu e-mail para receber
      subject: `Contato do site - ${nome}`,
      text: mensagem
    };

    await transporter.sendMail(mailOptions);
    res.json({ mensagem: "Mensagem enviada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao enviar mensagem." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
