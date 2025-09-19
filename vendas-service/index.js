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

app.post("/vendas", (req, res) => {
  const { cliente_id, produto_id, quantidade } = req.body;
  db.query("INSERT INTO vendas (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)", 
  [cliente_id, produto_id, quantidade], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Venda registrada!" });
  });
});

app.get("/vendas", (req, res) => {
  db.query("SELECT * FROM vendas", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log("Vendas service rodando na porta 3000"));
