const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "user",
  password: "password",
  database: "vendasdb"
});

app.post("/produtos", (req, res) => {
  const { nome, descricao, valor } = req.body;
  db.query("INSERT INTO produtos (nome, descricao, valor) VALUES (?, ?, ?)", 
  [nome, descricao, valor], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produto cadastrado!" });
  });
});

app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log("Produtos service rodando na porta 3000"));
