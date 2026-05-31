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
      service: "gmail", // pode usar outro serviço se preferir
      auth: {
        user: "tavc02@gmail.com", // e-mail que vai RECEBER as mensagens
        pass: process.env.EMAIL_PASS // senha ou app password do Gmail
      }
    });

    // Configuração da mensagem
    const mailOptions = {
      from: email, // e-mail da pessoa que preencheu o formulário
      to: "tavc02@gmail.com", // e-mail que vai receber
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
