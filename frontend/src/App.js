import React, { useState, useEffect } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));

    fetch("http://localhost:3002/clientes")
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch("http://localhost:3003/vendas")
      .then(res => res.json())
      .then(data => setVendas(data));
  }, []);

  return (
    <div>
      <h1>Controle de Vendas</h1>

      <h2>Produtos</h2>
      <ul>
        {produtos.map(p => (
          <li key={p.id}>{p.nome} - R${p.valor}</li>
        ))}
      </ul>

      <h2>Clientes</h2>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nome} - {c.telefone}</li>
        ))}
      </ul>

      <h2>Vendas</h2>
      <ul>
        {vendas.map(v => (
          <li key={v.id}>Cliente {v.cliente_id} comprou Produto {v.produto_id} (Qtd: {v.quantidade})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
