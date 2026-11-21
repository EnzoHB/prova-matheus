class Carrinho {
  #itens = []

  adicionarItem({ nome, preco }) {
    if (preco < 0) throw new Error('preco invalido')
    this.#itens.push({ nome, preco })
  }

  get total() {
    return this.#itens.reduce((soma, item) => soma + item.preco, 0)
  }
}

const carrinho = new Carrinho()
carrinho.adicionarItem({ nome: 'Caderno', preco: 20 })
carrinho.adicionarItem({ nome: 'Caneta', preco: 5 })
console.log(carrinho.total)
console.log(carrinho.itens)
