import { livros } from './livros'

type Item = { id: number; quantidade: number }

export const carrinho = $state({ itens: [] as Item[] })

export function carregarCarrinho() {
  const salvo = localStorage.getItem('livraria_carrinho')
  if (salvo) carrinho.itens = JSON.parse(salvo)
}

function salvar() {
  localStorage.setItem('livraria_carrinho', JSON.stringify(carrinho.itens))
}

export function adicionar(id: number) {
  const item = carrinho.itens.find((i) => i.id === id)
  if (item) item.quantidade++
  else carrinho.itens.push({ id, quantidade: 1 })
  salvar()
}

export function mudarQuantidade(id: number, quantidade: number) {
  const item = carrinho.itens.find((i) => i.id === id)
  if (!item) return
  if (quantidade <= 0) return remover(id)
  item.quantidade = quantidade
  salvar()
}

export function remover(id: number) {
  carrinho.itens = carrinho.itens.filter((i) => i.id !== id)
  salvar()
}

export function contador() {
  return carrinho.itens.reduce((soma, i) => soma + i.quantidade, 0)
}

export function total() {
  return carrinho.itens.reduce((soma, i) => {
    const livro = livros.find((l) => l.id === i.id)
    return soma + (livro ? livro.preco * i.quantidade : 0)
  }, 0)
}
