const evento = { nome: 'Semana JS', ano: 2025 }

const rotulo = ({ nome, ano }, prefixo = 'Evento') => `${prefixo}: ${nome} (${ano})`

console.log(rotulo(evento))
console.log(rotulo(evento, 'Palestra'))
