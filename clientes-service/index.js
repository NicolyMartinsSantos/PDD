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

app.post("/clientes", (req, res) => {
  const { nome, telefone } = req.body;
  db.query("INSERT INTO clientes (nome, telefone) VALUES (?, ?)", 
  [nome, telefone], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cliente cadastrado!" });
  });
});

app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log("Clientes service rodando na porta 3000"));
