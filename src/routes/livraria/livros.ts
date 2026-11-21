export type Livro = {
  id: number
  titulo: string
  autor: string
  editora: string
  ano: number
  paginas: number
  preco: number
  categoria: string
  sinopse: string
  cor: string
}

export const livros: Livro[] = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    editora: 'Garnier',
    ano: 1899,
    paginas: 256,
    preco: 29.9,
    categoria: 'Clássicos',
    sinopse:
      'Bentinho conta sua história com Capitu e a dúvida que nunca vai embora: ela o traiu ou não?',
    cor: '#7c3f2c',
  },
  {
    id: 2,
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    editora: 'Garnier',
    ano: 1890,
    paginas: 304,
    preco: 27.5,
    categoria: 'Clássicos',
    sinopse:
      'A vida dentro de um cortiço no Rio de Janeiro e como o ambiente muda as pessoas que moram nele.',
    cor: '#4b5e3a',
  },
  {
    id: 3,
    titulo: 'Iracema',
    autor: 'José de Alencar',
    editora: 'Ática',
    ano: 1865,
    paginas: 144,
    preco: 19.9,
    categoria: 'Clássicos',
    sinopse: 'A história de amor entre a índia Iracema e o português Martim no Ceará colonial.',
    cor: '#a0522d',
  },
  {
    id: 4,
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    editora: 'Garnier',
    ano: 1881,
    paginas: 368,
    preco: 34.9,
    categoria: 'Clássicos',
    sinopse: 'Um defunto autor conta a própria vida com ironia e muita sinceridade.',
    cor: '#2f4858',
  },
  {
    id: 5,
    titulo: 'Fundação',
    autor: 'Isaac Asimov',
    editora: 'Aleph',
    ano: 1951,
    paginas: 320,
    preco: 49.9,
    categoria: 'Ficção Científica',
    sinopse:
      'Um matemático prevê a queda do Império Galáctico e cria um plano para encurtar a era de trevas.',
    cor: '#1d3557',
  },
  {
    id: 6,
    titulo: 'Duna',
    autor: 'Frank Herbert',
    editora: 'Aleph',
    ano: 1965,
    paginas: 680,
    preco: 79.9,
    categoria: 'Ficção Científica',
    sinopse:
      'Paul Atreides vai para o planeta deserto Arrakis, onde está a especiaria mais valiosa do universo.',
    cor: '#c2853d',
  },
  {
    id: 7,
    titulo: 'Neuromancer',
    autor: 'William Gibson',
    editora: 'Aleph',
    ano: 1984,
    paginas: 320,
    preco: 54.9,
    categoria: 'Ficção Científica',
    sinopse: 'Um hacker decadente recebe uma última chance de trabalhar no ciberespaço.',
    cor: '#264653',
  },
  {
    id: 8,
    titulo: 'Eu, Robô',
    autor: 'Isaac Asimov',
    editora: 'Aleph',
    ano: 1950,
    paginas: 320,
    preco: 44.9,
    categoria: 'Ficção Científica',
    sinopse: 'Contos sobre robôs e as Três Leis da Robótica.',
    cor: '#6c757d',
  },
  {
    id: 9,
    titulo: 'Código Limpo',
    autor: 'Robert C. Martin',
    editora: 'Alta Books',
    ano: 2008,
    paginas: 425,
    preco: 89.9,
    categoria: 'Tecnologia',
    sinopse: 'Boas práticas para escrever código que outras pessoas consigam ler e manter.',
    cor: '#2a9d8f',
  },
  {
    id: 10,
    titulo: 'Entendendo Algoritmos',
    autor: 'Aditya Bhargava',
    editora: 'Novatec',
    ano: 2016,
    paginas: 264,
    preco: 69.9,
    categoria: 'Tecnologia',
    sinopse: 'Algoritmos explicados com desenhos e exemplos simples.',
    cor: '#e76f51',
  },
  {
    id: 11,
    titulo: 'JavaScript: O Guia Definitivo',
    autor: 'David Flanagan',
    editora: 'Bookman',
    ano: 2020,
    paginas: 706,
    preco: 129.9,
    categoria: 'Tecnologia',
    sinopse: 'Referência completa da linguagem JavaScript, do básico ao avançado.',
    cor: '#e9c46a',
  },
  {
    id: 12,
    titulo: 'O Programador Pragmático',
    autor: 'Andrew Hunt',
    editora: 'Bookman',
    ano: 1999,
    paginas: 352,
    preco: 84.9,
    categoria: 'Tecnologia',
    sinopse: 'Dicas práticas para quem quer melhorar como desenvolvedor.',
    cor: '#8338ec',
  },
]

export const categorias = ['Todas', 'Clássicos', 'Ficção Científica', 'Tecnologia']

export function capa(livro: Livro) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="200" height="300" fill="${livro.cor}"/><rect x="12" y="12" width="176" height="276" fill="none" stroke="#ffffff" stroke-opacity="0.4"/><text x="100" y="140" fill="#ffffff" font-family="Georgia, serif" font-size="18" text-anchor="middle">${livro.titulo.slice(0, 18)}</text><text x="100" y="250" fill="#ffffff" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">${livro.autor}</text></svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

export function reais(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
