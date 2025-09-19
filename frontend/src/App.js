


const produtos = [];
const clientes = [];
const vendas = [];


export function cadastrarProduto(nome, descricao, valor) {
  const produto = { id: produtos.length + 1, nome, descricao, valor };
  produtos.push(produto);
  return produto;
}

export function listarProdutos() {
  return produtos;
}


export function cadastrarCliente(nome, telefone) {
  const cliente = { id: clientes.length + 1, nome, telefone };
  clientes.push(cliente);
  return cliente;
}

export function listarClientes() {
  return clientes;
}


export function realizarVenda(clienteId, produtoIds) {
  // produtoIds: array de ids de produtos vendidos
  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) throw new Error('Cliente não encontrado');

  const produtosVendidos = produtoIds.map(pid => {
    const produto = produtos.find(p => p.id === pid);
    if (!produto) throw new Error(`Produto com id ${pid} não encontrado`);
    return produto;
  });

  const valorTotal = produtosVendidos.reduce((sum, p) => sum + p.valor, 0);
  const venda = {
    id: vendas.length + 1,
    cliente,
    produtos: produtosVendidos,
    valorTotal,
    data: new Date(),
  };
  vendas.push(venda);
  return venda;
}

export function listarVendas() {
  return vendas;
}
