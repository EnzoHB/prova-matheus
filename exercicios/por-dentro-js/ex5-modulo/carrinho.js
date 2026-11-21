function criarCarrinho() {
  let total = 0
  const itens = []

  return {
    adicionar(prato, preco) {
      itens.push(prato)
      total += preco
    },
    total() {
      return total
    },
  }
}

export const carrinho = criarCarrinho()
