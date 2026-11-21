class ItemAcervo {
  constructor(titulo) {
    this.titulo = titulo
  }

  gerarDescricao() {
    return `Item: ${this.titulo}`
  }
}

class Livro extends ItemAcervo {
  constructor(titulo, autor) {
    super(titulo)
    this.autor = autor
  }

  gerarDescricao() {
    return `Livro: ${this.titulo} de ${this.autor}`
  }
}

class Revista extends ItemAcervo {
  constructor(titulo, edicao) {
    super(titulo)
    this.edicao = edicao
  }

  gerarDescricao() {
    return `Revista: ${this.titulo} edição ${this.edicao}`
  }
}

const acervo = [
  new Livro('Dom Casmurro', 'Machado de Assis'),
  new Revista('Galileu', 300),
  new Livro('O Cortiço', 'Aluísio Azevedo'),
  new ItemAcervo('Mapa antigo'),
]

acervo.forEach((item) => console.log(item.gerarDescricao()))
